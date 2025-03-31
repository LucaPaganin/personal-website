import os
import json
from flask import Flask, render_template, request, session, redirect, url_for, g
from flask_babel import Babel, _ # _ è ancora usato per le stringhe UI nei template

# --- Configurazione App ---
app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24) # Chiave segreta per la sessione
app.config['BABEL_DEFAULT_LOCALE'] = 'it' # Lingua predefinita
app.config['BABEL_DEFAULT_TIMEZONE'] = 'Europe/Rome' # Fuso orario predefinito
app.config['LANGUAGES'] = { # Lingue supportate
    'en': 'English',
    'it': 'Italiano'
}
babel = Babel(app) # Inizializza Babel

# --- Caricamento Dati CV da JSON ---
# Definisce il percorso della cartella 'data'
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')

def load_json_data(filename):
    """Carica dati da un file JSON nella cartella data."""
    filepath = os.path.join(DATA_DIR, filename)
    try:
        # Apre e legge il file JSON specificato
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        # Gestisce il caso in cui il file non esista
        print(f"Errore: File non trovato - {filepath}")
        return None
    except json.JSONDecodeError:
        # Gestisce il caso in cui il JSON sia malformato
        print(f"Errore: Formato JSON non valido - {filepath}")
        return None
    except Exception as e:
        # Gestisce altri errori imprevisti durante il caricamento
        print(f"Errore sconosciuto durante il caricamento di {filepath}: {e}")
        return None

def load_all_cv_data():
    """Carica tutti i dati del CV dai rispettivi file JSON."""
    all_data = {}
    # Mappa le chiavi dati ai nomi dei file JSON
    data_files = {
        'personal_info': 'personal_info.json',
        'about_me': 'about_me.json',
        'experience': 'experience.json',
        'education': 'education.json',
        'phd_details': 'phd_details.json',
        'skills': 'skills.json',
        'conferences': 'conferences.json',
        'publications': 'publications.json',
        'projects': 'projects.json',
        'certifications': 'certifications.json'
    }
    # Itera su ogni file definito, lo carica e lo aggiunge al dizionario principale
    for key, filename in data_files.items():
        data = load_json_data(filename)
        if data is not None:
            all_data[key] = data
        else:
            # Se un file non viene caricato, imposta un valore di default e stampa un avviso
            all_data[key] = {} if key not in ['experience', 'education', 'conferences', 'publications', 'projects'] else []
            print(f"Attenzione: Dati per '{key}' non caricati correttamente.")
    return all_data

# Carica tutti i dati una sola volta all'avvio dell'applicazione
cv_data_loaded = load_all_cv_data()

# --- Funzioni Babel ---
@babel.localeselector
def get_locale():
    """Determina la lingua da usare per la richiesta corrente."""
    if 'language' in session:
        return session['language']
    return request.accept_languages.best_match(app.config['LANGUAGES'].keys())

@app.before_request
def before_request():
    """Eseguito prima di ogni richiesta."""
    # Imposta la lingua corrente e i dati caricati nel contesto globale 'g'
    g.locale = str(get_locale())
    g.cv_data = cv_data_loaded # Rende i dati accessibili nei template tramite 'g.cv_data'

# --- Helper per Localizzazione Contenuto ---
@app.context_processor
def inject_localization_helper():
    """Rende la funzione get_localized disponibile in tutti i template."""
    def get_localized(content_dict):
        """
        Restituisce il valore per la lingua corrente (g.locale)
        da un dizionario {'it': '...', 'en': '...'}.
        Include fallback alla lingua di default se la traduzione manca.
        """
        if isinstance(content_dict, dict):
            # Prova a ottenere il testo nella lingua corrente
            localized_text = content_dict.get(g.locale)
            if localized_text is not None: # Controlla anche stringhe vuote
                return localized_text

            # Fallback: prova la lingua di default dell'app
            default_locale = app.config.get('BABEL_DEFAULT_LOCALE', 'en')
            if g.locale != default_locale: # Evita controllo ridondante se locale è già default
                fallback_text = content_dict.get(default_locale)
                if fallback_text is not None:
                     # Stampa un avviso se si usa il fallback (utile per debug)
                    print(f"Warning: Missing translation for locale '{g.locale}'. Using default '{default_locale}'. Content: {list(content_dict.values())[0][:50]}...")
                    return fallback_text

            # Fallback estremo: restituisci il primo valore trovato o stringa vuota
            if content_dict:
                return list(content_dict.values())[0]
            else:
                return "" # Dizionario vuoto
        # Se l'input non è un dizionario, restituiscilo (potrebbe essere stringa, numero, None)
        return content_dict

    # Rende la funzione disponibile nei template con il nome 'get_localized'
    return dict(get_localized=get_localized)

# --- Route ---
# Le route usano g.cv_data (accessibile nei template)
@app.route('/')
def index():
    return render_template('index.html') # Non serve passare 'data' esplicitamente

@app.route('/education')
def education():
    return render_template('education.html')

@app.route('/phd')
def phd():
    return render_template('phd.html')

@app.route('/experience')
def experience():
    return render_template('experience.html')

@app.route('/skills')
def skills():
    return render_template('skills.html')

@app.route('/conferences')
def conferences():
    return render_template('conferences.html')

@app.route('/publications')
def publications():
    return render_template('publications.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/certifications')
def certifications():
    return render_template('certifications.html')


@app.route('/language/<language>')
def set_language(language=None):
    """Imposta la lingua scelta nella sessione e ricarica la pagina."""
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
    # debug=True è utile in sviluppo, disattivalo in produzione
    app.run(debug=True)
