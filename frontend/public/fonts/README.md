# Téléchargement des polices locales

## Instructions

Pour télécharger les polices Google Fonts en local, visitez ces URLs et téléchargez les fichiers WOFF2 :

### Cormorant Garamond
- **Light 300**: https://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQAllvuQWJ5heb_w.woff2
- **Regular 400**: https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYrEPjuw.woff2
- **Medium 500**: https://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQKlhvuQWJ5heb_w.woff2
- **SemiBold 600**: https://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQdl9vuQWJ5heb_w.woff2

### Montserrat
- **Light 300**: https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Hw0aXp-p7K4KLg.woff2
- **Regular 400**: https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw0aXp-p7K4KLg.woff2
- **Medium 500**: https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Hw0aXp-p7K4KLg.woff2
- **SemiBold 600**: https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCu170w0aXp-p7K4KLg.woff2

## Nommage des fichiers

Renommez les fichiers téléchargés comme suit :
- `cormorant-garamond-v16-latin-300.woff2`
- `cormorant-garamond-v16-latin-regular.woff2`
- `cormorant-garamond-v16-latin-500.woff2`
- `cormorant-garamond-v16-latin-600.woff2`
- `montserrat-v26-latin-300.woff2`
- `montserrat-v26-latin-regular.woff2`
- `montserrat-v26-latin-500.woff2`
- `montserrat-v26-latin-600.woff2`

## Alternative : Script de téléchargement

Vous pouvez utiliser ce script PowerShell pour télécharger automatiquement :

```powershell
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

foreach ($font in $fonts.GetEnumerator()) {
    Invoke-WebRequest -Uri $font.Value -OutFile $font.Key
    Write-Host "Téléchargé: $($font.Key)"
}
```

Exécutez ce script dans le dossier `frontend/public/fonts/`
