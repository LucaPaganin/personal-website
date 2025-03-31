import os
import json
import markdown
import datetime
from flask import Flask, request, session, g # Rimosso render_template, redirect, url_for se non usati qui
from flask_babel import Babel, _

# Importa il Blueprint dal file routes.py
from routes import main_bp

# --- Funzione Locale Selector (definita prima dell'app) ---
# (Questa funzione ora serve a babel.init_app)
def get_locale():
    """Determina la lingua da usare per la richiesta corrente."""
    if 'language' in session:
        return session['language']
    # request è disponibile nel contesto della richiesta
    if request:
        match = request.accept_languages.best_match(app.config['LANGUAGES'].keys())
        if match:
            return match
    # Fallback alla lingua di default
    return app.config['BABEL_DEFAULT_LOCALE']


# --- Configurazione App ---
app = Flask(__name__) # Crea l'istanza dell'applicazione Flask
app.config['SECRET_KEY'] = os.urandom(24)
app.config['BABEL_DEFAULT_LOCALE'] = 'it'
app.config['BABEL_DEFAULT_TIMEZONE'] = 'Europe/Rome'
app.config['LANGUAGES'] = {
    'en': 'English',
    'it': 'Italiano'
}

# --- Inizializzazione Estensioni ---
babel = Babel(app)
# Registra il selettore di lingua usando init_app
babel.init_app(app, locale_selector=get_locale)


# --- Percorsi Dati ---
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
MD_DATA_DIR = os.path.join(DATA_DIR, 'md')

# --- Caricamento Dati Strutturali da JSON ---
def load_json_data(filename):
    """Carica dati da un file JSON nella cartella data principale."""
    filepath = os.path.join(DATA_DIR, filename)
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Errore: File JSON non trovato - {filepath}")
        return None
    except json.JSONDecodeError:
        print(f"Errore: Formato JSON non valido - {filepath}")
        return None
    except Exception as e:
        print(f"Errore sconosciuto durante il caricamento di {filepath}: {e}")
        return None

def load_all_structural_data():
    """Carica i dati strutturali dai file JSON."""
    all_data = {}
    json_files = {
        'personal_info': 'personal_info.json',
        'experience': 'experience.json',
        'education': 'education.json',
        'phd_details': 'phd_details.json',
        'skills': 'skills.json',
        'conferences': 'conferences.json',
        'publications': 'publications.json',
        'projects': 'projects.json',
        'certifications': 'certifications.json'
    }
    for key, filename in json_files.items():
        data = load_json_data(filename)
        if data is not None:
            all_data[key] = data
        else:
            default_value = [] if key in ['experience', 'education', 'conferences', 'publications', 'projects'] else {}
            all_data[key] = default_value
            print(f"Attenzione: Dati strutturali per '{key}' non caricati correttamente.")
    return all_data

structural_data_loaded = load_all_structural_data()

# --- Funzioni Pre-Richiesta ---
@app.before_request
def before_request():
    """Eseguito prima di ogni richiesta."""
    # Imposta la lingua corrente nel contesto globale 'g'
    g.locale = str(get_locale()) # Chiama get_locale per impostare g.locale
    # Rende disponibili i dati JSON strutturali nel contesto 'g'
    g.structural_data = structural_data_loaded

# --- Context Processors ---
@app.context_processor
def inject_current_time():
    """Rende disponibile l'oggetto datetime corrente ai template."""
    return {'now': datetime.datetime.now()}

@app.context_processor
def inject_content_helpers():
    """Rende disponibili gli helper get_localized e render_md_localized nei template."""
    def get_localized(content_dict):
        """Restituisce il valore per g.locale da un dizionario JSON."""
        if isinstance(content_dict, dict):
            localized_text = content_dict.get(g.locale)
            if localized_text is not None: return localized_text
            default_locale = app.config.get('BABEL_DEFAULT_LOCALE', 'en')
            if g.locale != default_locale:
                fallback_text = content_dict.get(default_locale)
                if fallback_text is not None: return fallback_text
            if content_dict: return list(content_dict.values())[0]
            else: return ""
        return content_dict

    def render_md_localized(md_id):
        """Carica e converte il file Markdown corretto da data/md/."""
        html_content = None
        default_locale = app.config.get('BABEL_DEFAULT_LOCALE', 'en')
        md_filename = f"{md_id}.{g.locale}.md"
        filepath = os.path.join(MD_DATA_DIR, md_filename)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                md_content = f.read()
                html_content = markdown.markdown(md_content, extensions=['fenced_code', 'tables'])
        except FileNotFoundError:
            if g.locale != default_locale:
                md_filename_fallback = f"{md_id}.{default_locale}.md"
                filepath_fallback = os.path.join(MD_DATA_DIR, md_filename_fallback)
                try:
                    with open(filepath_fallback, 'r', encoding='utf-8') as f:
                        md_content_fallback = f.read()
                        html_content = markdown.markdown(md_content_fallback, extensions=['fenced_code', 'tables'])
                        print(f"Warning (render_md_localized): File '{filepath}' not found. Using default '{filepath_fallback}'.")
                except FileNotFoundError:
                    print(f"Error (render_md_localized): Markdown file not found for id '{md_id}' in '{MD_DATA_DIR}' for locale '{g.locale}' or default '{default_locale}'.")
                    html_content = f"<p><i>Error: Content '{md_id}' not found.</i></p>"
            else:
                 print(f"Error (render_md_localized): Markdown file not found for id '{md_id}' in '{MD_DATA_DIR}' for locale '{g.locale}'.")
                 html_content = f"<p><i>Error: Content '{md_id}' not found.</i></p>"
        except Exception as e:
            print(f"Error processing markdown file {filepath}: {e}")
            html_content = f"<p><i>Error processing content '{md_id}'.</i></p>"
        return html_content if html_content is not None else ""

    return dict(
        get_localized=get_localized,
        render_md_localized=render_md_localized
    )

# --- Registrazione Blueprint ---
# Registra il blueprint importato da routes.py sull'applicazione principale
app.register_blueprint(main_bp)


# --- Avvio App ---
if __name__ == '__main__':
    # debug=True è utile in sviluppo, disattivalo in produzione
    app.run(debug=True)

