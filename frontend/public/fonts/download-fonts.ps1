# Script PowerShell pour telecharger les polices Google Fonts localement
# Executez ce script dans le dossier frontend/public/fonts/

Write-Host "Telechargement des polices Google Fonts..." -ForegroundColor Green

$fonts = @{
    "cormorant-garamond-v16-latin-300.woff2" = "https://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQAllvuQWJ5heb_w.woff2"
    "cormorant-garamond-v16-latin-regular.woff2" = "https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYrEPjuw.woff2"
    "cormorant-garamond-v16-latin-500.woff2" = "https://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQKlhvuQWJ5heb_w.woff2"
    "cormorant-garamond-v16-latin-600.woff2" = "https://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQdl9vuQWJ5heb_w.woff2"
    "montserrat-v26-latin-300.woff2" = "https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Hw0aXp-p7K4KLg.woff2"
    "montserrat-v26-latin-regular.woff2" = "https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw0aXp-p7K4KLg.woff2"
    "montserrat-v26-latin-500.woff2" = "https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Hw0aXp-p7K4KLg.woff2"
    "montserrat-v26-latin-600.woff2" = "https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCu170w0aXp-p7K4KLg.woff2"
}

$totalFonts = $fonts.Count
$currentFont = 0
$successCount = 0

foreach ($font in $fonts.GetEnumerator()) {
    $currentFont++
    
    if (Test-Path $font.Key) {
        Write-Host "[$currentFont/$totalFonts] $($font.Key) existe deja" -ForegroundColor Yellow
        $successCount++
        continue
    }
    
    Write-Host "[$currentFont/$totalFonts] Telechargement de $($font.Key)..." -ForegroundColor Cyan
    
    try {
        Invoke-WebRequest -Uri $font.Value -OutFile $font.Key -ErrorAction Stop
        Write-Host "  OK Telecharge avec succes" -ForegroundColor Green
        $successCount++
    }
    catch {
        Write-Host "  ERREUR: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Telechargement termine! ($successCount/$totalFonts polices disponibles)" -ForegroundColor Green
