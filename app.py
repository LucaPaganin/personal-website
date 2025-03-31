import os
import json
import markdown
import datetime
from flask import Flask, render_template, request, session, redirect, url_for, g
from flask_babel import Babel, _

# --- Funzione Locale Selector (definita prima dell'app) ---
def get_locale():
    """Determina la lingua da usare per la richiesta corrente."""
    if 'language' in session:
        return session['language']
    if request:
        # Match against configured languages
        return request.accept_languages.best_match(app.config['LANGUAGES'].keys())
    # Fallback if no request context or no match
    return app.config['BABEL_DEFAULT_LOCALE']


# --- Configurazione App ---
app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)
app.config['BABEL_DEFAULT_LOCALE'] = 'it'
app.config['BABEL_DEFAULT_TIMEZONE'] = 'Europe/Rome'
app.config['LANGUAGES'] = {
    'en': 'English',
    'it': 'Italiano'
}

# --- Inizializzazione Babel ---
babel = Babel(app)
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
    # Lista aggiornata dei file JSON necessari
    json_files = {
        'personal_info': 'personal_info.json',
        'experience': 'experience.json',
        'education': 'education.json', # Contiene la struttura per education e ID MD
        'phd_details': 'phd_details.json', # Contiene struttura PhD e ID MD
        'skills': 'skills.json', # Contiene struttura skills
        'conferences': 'conferences.json', # Contiene lista conferenze
        'publications': 'publications.json', # Contiene lista pubblicazioni (senza abstract)
        'projects': 'projects.json', # Contiene lista progetti (senza descrizioni)
        'certifications': 'certifications.json' # Contiene struttura certificazioni
    }
    for key, filename in json_files.items():
        data = load_json_data(filename)
        if data is not None:
            all_data[key] = data
        else:
            # Imposta default appropriato se caricamento fallisce
            default_value = [] if key in ['experience', 'education', 'conferences', 'publications', 'projects'] else {}
            all_data[key] = default_value
            print(f"Attenzione: Dati strutturali per '{key}' non caricati correttamente.")
    return all_data

structural_data_loaded = load_all_structural_data()

# --- Funzioni Pre-Richiesta ---
@app.before_request
def before_request():
    """Eseguito prima di ogni richiesta."""
    g.locale = str(get_locale())
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

# --- Route Aggiornate ---
@app.route('/')
def index():
    # Pagina principale (Su di me)
    return render_template('index.html')

@app.route('/experience')
def experience():
    # Pagina Esperienza Lavorativa
    return render_template('experience.html')

@app.route('/education') # Nuova route per education + Dottorato
def education():
    return render_template('education.html')

@app.route('/skills') # Nuova route per skills + Certificazioni
def skills():
    return render_template('skills.html')

@app.route('/ricerca') # Nuova route per Pubblicazioni + Conferenze
def ricerca():
    return render_template('ricerca.html')

@app.route('/projects')
def projects():
    # Pagina Progetti
    return render_template('projects.html')

# Route per cambio lingua (invariata)
@app.route('/language/<language>')
def set_language(language=None):
    if language in app.config['LANGUAGES']:
        session['language'] = language
    referrer = request.referrer
    if referrer:
         base_referrer = referrer.split('?')[0]
         if f'/language/{language}' not in base_referrer:
              return redirect(referrer)
    return redirect(url_for('index'))


# --- Avvio App ---
if __name__ == '__main__':
    app.run(debug=True)
