# routes.py
from flask import (
    Blueprint, render_template, request, session, redirect, url_for, g
)
# Nota: Non importiamo 'app' qui per evitare importazioni circolari.
# Usiamo un Blueprint.

# Crea un Blueprint chiamato 'main'
# Il primo argomento 'main' è il nome del blueprint.
# Il secondo argomento __name__ aiuta Flask a localizzare le risorse (es. template).
main_bp = Blueprint('main', __name__)

# --- Route definite sul Blueprint ---
# Usa @main_bp.route invece di @app.route

@main_bp.route('/')
def index():
    # Pagina principale (Su di me)
    # render_template trova automaticamente la cartella 'templates'
    # g.structural_data è disponibile grazie al before_request in app.py
    return render_template('index.html')

@main_bp.route('/')
def aboutme():
    # Pagina principale (Su di me)
    # render_template trova automaticamente la cartella 'templates'
    # g.structural_data è disponibile grazie al before_request in app.py
    return render_template('aboutme.html')

@main_bp.route('/experience')
def experience():
    # Pagina Esperienza Lavorativa
    return render_template('experience.html')

@main_bp.route('/education')
def education():
    # Pagina education + Dottorato
    return render_template('education.html')

@main_bp.route('/skills')
def skills():
    # Pagina skills + Certificazioni
    return render_template('skills.html')

@main_bp.route('/research')
def research():
    # Pagina Pubblicazioni + Conferenze
    return render_template('research.html')

@main_bp.route('/projects')
def projects():
    # Pagina Progetti
    return render_template('projects.html')

# Route per cambio lingua (ora appartiene al Blueprint)
# Nota: url_for per questa route ora sarà 'main.set_language'
@main_bp.route('/language/<language>')
def set_language(language=None):
    # Accede a app.config tramite l'oggetto 'current_app' o importando 'app'
    # ma è meglio evitare l'import diretto di 'app'.
    # Per ora assumiamo che LANGUAGES sia accessibile o lo passiamo in qualche modo.
    # Soluzione semplice: Accedere tramite 'g' se lo aggiungiamo in before_request
    # Soluzione migliore: Usare current_app importato da Flask
    from flask import current_app # Importa current_app qui dentro se necessario

    if language in current_app.config['LANGUAGES']:
        session['language'] = language
    referrer = request.referrer
    if referrer:
         base_referrer = referrer.split('?')[0]
         # Usa url_for('main.index') per il fallback se si usa il blueprint
         if f'/language/{language}' not in base_referrer:
              return redirect(referrer)
    return redirect(url_for('main.index')) # Usa il nome del blueprint nel fallback

# Nota: La route per i file statici è gestita automaticamente da Flask
# e non ha bisogno di essere definita qui o in app.py.
