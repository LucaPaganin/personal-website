<#
.SYNOPSIS
Script per gestire le traduzioni Flask-Babel (extract, update, compile).

.DESCRIPTION
Questo script PowerShell automatizza il processo di aggiornamento delle traduzioni:
1. Estrae i messaggi da codice sorgente e template in un file .pot.
2. Aggiorna i file .po specifici della lingua con i nuovi messaggi.
3. Compila i file .po in file .mo binari.

.NOTES
Assicurati che 'pybabel' sia nel tuo PATH o che l'ambiente virtuale Python sia attivato
nella sessione PowerShell corrente prima di eseguire lo script.
Potrebbe essere necessario aggiustare la policy di esecuzione di PowerShell per eseguire script locali
(es. Esegui PowerShell come Amministratore e digita: Set-ExecutionPolicy RemoteSigned).
#>

# --- Configurazione ---
$configFile = "babel.cfg"        # Percorso file configurazione Babel
$potFile = "messages.pot"        # Percorso file POT (template)
$translationsDir = "translations" # Directory delle traduzioni

# --- Passaggi ---

Write-Host "1. Estrazione messaggi da sorgenti e template..."
# Esegue pybabel extract. Assicurati che pybabel sia accessibile.
# Il '.' indica la directory corrente.
pybabel extract -F $configFile -o $potFile .

# Controlla l'esito dell'ultimo comando esterno
if ($LASTEXITCODE -ne 0) {
    Write-Error "Errore durante l'estrazione dei messaggi. Interruzione."
    # Esce dallo script con il codice di errore
    exit $LASTEXITCODE
}
Write-Host "   Estrazione completata: '$potFile' aggiornato." -ForegroundColor Green

Write-Host "2. Aggiornamento cataloghi lingua (.po files)..."
# Esegue pybabel update
pybabel update -i $potFile -d $translationsDir

# Controlla l'esito
if ($LASTEXITCODE -ne 0) {
    Write-Error "Errore durante l'aggiornamento dei cataloghi. Interruzione."
    # Potresti voler rimuovere il file .pot se l'update fallisce
    # Remove-Item $potFile -ErrorAction SilentlyContinue
    exit $LASTEXITCODE
}
Write-Host "   Cataloghi lingua aggiornati in '$translationsDir'." -ForegroundColor Green
Write-Host "   >>> IMPORTANTE: Modifica ora i file .po in '$translationsDir\<lang>\LC_MESSAGES\' per aggiungere/aggiornare le traduzioni! <<<" -ForegroundColor Yellow


Write-Host "3. Compilazione cataloghi messaggi (.mo files)..."
# Esegue pybabel compile
pybabel compile -d $translationsDir

# Controlla l'esito
if ($LASTEXITCODE -ne 0) {
    Write-Error "Errore durante la compilazione dei cataloghi."
    exit $LASTEXITCODE
}
Write-Host "   Compilazione completata: file .mo generati in '$translationsDir'." -ForegroundColor Green

Write-Host "Processo di aggiornamento traduzioni terminato con successo." -ForegroundColor Cyan

# Esce con codice 0 (successo)
exit 0
