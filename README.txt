Itmam - Qur'an memory games (installable web app / PWA)

DEPLOY
Plain static site: no build step, no server, no database. Upload the whole "itmam" folder to any HTTPS host
(Netlify / Vercel drag-and-drop, AWS Amplify "Deploy without Git", GitHub/GitLab Pages). HTTPS is required to install.
Local test:  cd itmam && python3 -m http.server 8080   -> http://localhost:8080

INSTALL ON PHONES
  Android (Chrome): Settings tab -> "Install on this device" (or Chrome menu -> Install app).
  iPhone (Safari): Share -> Add to Home Screen.

WHOLE QUR'AN (114 surahs, 6,236 ayahs)
  s/NNN.json   one file per surah: Uthmani text, word meanings, transliteration, Saheeh International,
               word start times for 5 reciters (loaded only when that surah is used)
  meta.json    surah list + reciters      vocab.json   word list for answer options
  bundle.json  offsets into the built-in audio (audio/) for Al-Fatihah, Al-Ahzab and Juz 'Amma

AUDIO
  Built-in (offline, instant): audio/<reciter>/ for the 39 surahs above (~175 MB).
  Every other surah streams ayah by ayah from the Maqra mirror of everyayah.com on Hugging Face's CDN
  (huggingface.co/datasets/maqra-project/...), with everyayah.com itself as backup. The next ayahs are fetched
  ahead of time so playback flows, and the service worker keeps what you've heard on the device.
  For zero dependence on outside hosts, mirror the six reciter sets to your own S3/CloudFront bucket and change
  streamURLs() in index.html to point at it (same SSSAAA.mp3 file names).

GAMES
  Mode: Finish the Ayah / Guess the Surah. Players: Learn on your own / Learn with a Friend (alternating turns).
  Finish the Ayah - All surahs: a random surah from a random ayah, 5 ayahs in order, then another random surah,
                    until 10 rounds. One surah: any of the 114, 10 ayahs in order. Blank in the middle or last third;
                    recitation stops at the blank; 30 s; the ayah is completed after the answer.
  Guess the Surah - 10 different surahs from all 114, 1-3 ayahs, text shown as it is recited, 15 s.

SOURCES / LICENCES (check before a public or commercial launch)
  Text: King Fahd Complex Uthmani Hafs v13 (via fawazahmed0/quran-api); all 6,236 ayahs cross-checked against khaledhosny/quran-data
  Audio: everyayah.com recordings via the Maqra archive (github.com/Abdalla-Eldoumani/maqra)
  Word timings: quran-align by Collin Fair, CC BY 4.0 (github.com/cpfair/quran-align) - attribution required
  Word meanings: Quran.com word-by-word; Translation: Saheeh International
