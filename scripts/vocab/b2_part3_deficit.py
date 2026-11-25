"""B2 Part 3 Deficit Top-ups for Topics 15 to 18.
Topics: Kommunikation, Gefühle und Meinungen, Medien und Digitalisierung, Kultur und Geschichte
Format: [word, pos, extra1, extra2, topic, subtopic, meaningId, exampleDe, exampleId, difficulty]
"""

B2_PART3_DEFICIT = [
    # ==========================================
    # TOPIC 15: Kommunikation (8 entries)
    # ==========================================
    [
        "Gesprächsverlauf", "Nomen", "der", "Gesprächsverläufe",
        "Kommunikation", "Diskussionsführung",
        "alur percakapan",
        "Der Moderator beeinflusste den Gesprächsverlauf durch gezielte Zwischenfragen maßgeblich.",
        "Moderator secara signifikan memengaruhi alur percakapan melalui pertanyaan sela yang terarah.",
        "Mittel"
    ],
    [
        "rhetorisch", "Adjektiv", "rhetorischer", "am rhetorischsten",
        "Kommunikation", "Rhetorik",
        "secara retoris / retoris",
        "Auf eine rein rhetorische Frage wird in der Regel keine Antwort erwartet.",
        "Pada pertanyaan yang murni retoris, biasanya tidak diharapkan adanya jawaban.",
        "Mittel"
    ],
    [
        "Schlagabtausch", "Nomen", "der", "Schlagabtausche",
        "Kommunikation", "Debatte",
        "adu argumen sengit / debat terbuka",
        "Während der Fernsehdebatte lieferten sich die beiden Politiker einen hitzigen Schlagabtausch.",
        "Selama debat televisi, kedua politisi itu terlibat dalam adu argumen yang sengit.",
        "Anspruchsvoll"
    ],
    [
        "Gegenrede", "Nomen", "die", "Gegenreden",
        "Kommunikation", "Widerrede",
        "sanggahan / bantahan lisan",
        "In ihrer engagierten Gegenrede widerlegte die Abgeordnete die Argumente der Opposition.",
        "Dalam sanggahan lisannya yang berapi-api, anggota parlemen itu membantah argumen oposisi.",
        "Anspruchsvoll"
    ],
    [
        "Streitpunkt", "Nomen", "der", "Streitpunkte",
        "Kommunikation", "Streitkultur",
        "pokok perselisihan",
        "Die Verteilung des Budgets bildete den zentralen Streitpunkt der Verhandlungen.",
        "Pembagian anggaran menjadi pokok perselisihan utama dalam negosiasi tersebut.",
        "Mittel"
    ],
    [
        "Wortführer", "Nomen", "der", "Wortführer",
        "Kommunikation", "Rollenverteilung",
        "juru bicara utama / pemimpin suara",
        "Er trat als unangefochtener Wortführer der unzufriedenen Mitarbeiter auf.",
        "Ia tampil sebagai juru bicara utama yang tak terbantahkan bagi para karyawan yang tidak puas.",
        "Mittel"
    ],
    [
        "Schlichtung", "Nomen", "die", "Schlichtungen",
        "Kommunikation", "Konfliktbeilegung",
        "arbitrase / mediasi perdamaian",
        "Die beiden Tarifparteien einigten sich auf eine Schlichtung durch eine neutrale Kommission.",
        "Kedua belah pihak perundingan upah menyepakati mediasi perdamaian melalui komisi netral.",
        "Anspruchsvoll"
    ],
    [
        "Ausflucht", "Nomen", "die", "Ausflüchte",
        "Kommunikation", "Ausrede",
        "alasan berbelit-belit / dalih",
        "Bei ernsten Versäumnissen werden fadenscheinige Ausflüchte von der Schulleitung nicht akzeptiert.",
        "Pada kelalaian serius, dalih yang dibuat-buat tidak akan diterima oleh pihak pimpinan sekolah.",
        "Mittel"
    ],

    # ==========================================
    # TOPIC 16: Gefühle und Meinungen (12 entries)
    # ==========================================
    [
        "Verunsicherung", "Nomen", "die", "Verunsicherungen",
        "Gefühle und Meinungen", "Zweifel",
        "rasa gamang / ketidakpastian",
        "Widersprüchliche Nachrichtenmeldungen führten zu spürbarer Verunsicherung in der Bevölkerung.",
        "Pemberitaan yang saling bertentangan memicu rasa gamang yang nyata di kalangan masyarakat.",
        "Mittel"
    ],
    [
        "Bedenken", "Nomen", "das", "Bedenken",
        "Gefühle und Meinungen", "Skepsis",
        "keraguan / kekhawatiran beralasan",
        "Der Experte äußerte ernsthafte Bedenken hinsichtlich der Sicherheit des neuen Verfahrens.",
        "Pakar tersebut menyampaikan kekhawatiran serius terkait keamanan prosedur baru itu.",
        "Mittel"
    ],
    [
        "Zerrissenheit", "Nomen", "die", "Zerrissenheiten",
        "Gefühle und Meinungen", "Innere Konflikte",
        "kebimbangan batin / keterpecahan perasaan",
        "Seine innere Zerrissenheit zwischen beruflicher Pflicht und Familie war ihm deutlich anzumerken.",
        "Kebimbangan batinnya antara kewajiban profesi dan keluarga terlihat sangat jelas padanya.",
        "Anspruchsvoll"
    ],
    [
        "ausgeglichen", "Adjektiv", "ausgeglichener", "am ausgeglichensten",
        "Gefühle und Meinungen", "Seelenruhe",
        "seimbang secara emosional / tenang",
        "Dank regelmäßiger Bewegung wirkt sie im Berufsalltag bemerkenswert ausgeglichen.",
        "Berkat olahraga teratur, ia tampak luar biasa seimbang secara emosional dalam keseharian kerja.",
        "Mittel"
    ],
    [
        "mitfühlen", "Verb", ("fühlt mit", "fühlte mit", "hat mitgefühlt", "mitgefühlt"), None,
        "Gefühle und Meinungen", "Empathie",
        "berempati / ikut merasakan kesedihan",
        "Wer schon einmal ein Haustier verloren hat, kann den Schmerz der Nachbarin tief mitfühlen.",
        "Siapa pun yang pernah kehilangan hewan peliharaan dapat berempati secara mendalam terhadap rasa sakit sang tetangga.",
        "Mittel"
    ],
    [
        "befürworten", "Verb", ("befürwortet", "befürwortete", "hat befürwortet", "befürwortet"), None,
        "Gefühle und Meinungen", "Befürwortung",
        "mendukung / menyetujui secara positif",
        "Die Mehrheit der Ratsmitglieder befürwortet den zügigen Bau des neuen Jugendzentrums.",
        "Mayoritas anggota dewan menyetujui pembangunan cepat pusat remaja baru tersebut.",
        "Mittel"
    ],
    [
        "Missmut", "Nomen", "der", "Missmut (Sg.)",
        "Gefühle und Meinungen", "Unmut",
        "rasa kesal / kegundahan",
        "Die anhaltenden Zugverspätungen schufen bei den Pendlern großen Missmut.",
        "Keterlambatan kereta yang terus menerus menimbulkan rasa kesal yang besar di kalangan komuter.",
        "Mittel"
    ],
    [
        "Bestürzung", "Nomen", "die", "Bestürzungen",
        "Gefühle und Meinungen", "Erschütterung",
        "keterkejutan mendalam / kegemparan hati",
        "Die Nachricht vom plötzlichen Rücktritt des Direktors löste tiefe Bestürzung aus.",
        "Kabar mengenai pengunduran diri mendadak sang direktur menimbulkan keterkejutan yang mendalam.",
        "Anspruchsvoll"
    ],
    [
        "Herzensangelegenheit", "Nomen", "die", "Herzensangelegenheiten",
        "Gefühle und Meinungen", "Herzblut",
        "hal yang sangat dicintai / perkara hati",
        "Der Schutz bedrohter Tierarten ist für die engagierte Biologin eine echte Herzensangelegenheit.",
        "Perlindungan spesies hewan terancam punah merupakan hal yang sangat dicintai bagi ahli biologi berdedikasi tersebut.",
        "Mittel"
    ],
    [
        "Heimatgefühl", "Nomen", "das", "Heimatgefühle",
        "Gefühle und Meinungen", "Verbundenheit",
        "rasa keterikatan pada kampung halaman",
        "Die vertrauten Dialektklänge weckten in ihm sofort ein warmes Heimatgefühl.",
        "Bunyi dialek yang akrab segera membangkitkan rasa keterikatan pada kampung halaman yang hangat dalam dirinya.",
        "Mittel"
    ],
    [
        "Verstimmung", "Nomen", "die", "Verstimmungen",
        "Gefühle und Meinungen", "Verstimmung",
        "kekecewaan / hubungan yang meregang",
        "Die unüberlegte Bemerkung des Abteilungsleiters führte zu diplomatischer Verstimmung im Team.",
        "Komentar tanpa pikir panjang dari kepala bagian memicu kekecewaan dan hubungan yang meregang dalam tim.",
        "Mittel"
    ],
    [
        "Wohlwollen", "Nomen", "das", "Wohlwollen (Sg.)",
        "Gefühle und Meinungen", "Sympathie",
        "itikad baik / kemurahan hati",
        "Der neue Auszubildende wurde von den älteren Kollegen mit spürbarem Wohlwollen aufgenommen.",
        "Anak magang baru tersebut diterima oleh rekan-rekan senior dengan itikad baik yang hangat.",
        "Anspruchsvoll"
    ],

    # ==========================================
    # TOPIC 17: Medien und Digitalisierung (12 entries)
    # ==========================================
    [
        "Datenpanne", "Nomen", "die", "Datenpannen",
        "Medien und Digitalisierung", "Sicherheitsvorfall",
        "kebocoran data / insiden keamanan data",
        "Nach einer schweren Datenpanne informierte der Online-Händler umgehend alle betroffenen Kunden.",
        "Setelah insiden kebocoran data yang parah, peritel daring tersebut segera memberitahu seluruh pelanggan yang terdampak.",
        "Mittel"
    ],
    [
        "Rechtemanagement", "Nomen", "das", "Rechtemanagements",
        "Medien und Digitalisierung", "Lizenzierung",
        "manajemen hak cipta dan akses digital",
        "Modernes Rechtemanagement verhindert die unbefugte Weitergabe urheberrechtlich geschützter Medien.",
        "Manajemen hak cipta modern mencegah penyebaran tanpa izin media yang dilindungi hak cipta.",
        "Anspruchsvoll"
    ],
    [
        "Nachrichtenagentur", "Nomen", "die", "Nachrichtenagenturen",
        "Medien und Digitalisierung", "Nachrichtenwesen",
        "kantor berita",
        "Große Tageszeitungen beziehen ihre weltweiten Eilmeldungen häufig von einer führenden Nachrichtenagentur.",
        "Surat kabar harian besar sering kali memperoleh berita kilat dunia dari kantor berita terkemuka.",
        "Mittel"
    ],
    [
        "Medienkompetenz", "Nomen", "die", "Medienkompetenzen",
        "Medien und Digitalisierung", "Digitalkompetenz",
        "literasi media / kemampuan mengkritisi media",
        "Schulen fördern die Medienkompetenz, damit Jugendliche verlässliche Quellen von Desinformation unterscheiden.",
        "Sekolah mendorong literasi media agar para remaja mampu membedakan sumber tepercaya dari disinformasi.",
        "Mittel"
    ],
    [
        "Leitmedium", "Nomen", "das", "Leitmedien",
        "Medien und Digitalisierung", "Leitmedien",
        "media acuan utama",
        "In vielen politischen Debatten gilt die seriöse Wochenzeitung nach wie vor als maßgebliches Leitmedium.",
        "Dalam banyak perdebatan politik, surat kabar mingguan yang kredibel masih dianggap sebagai media acuan utama.",
        "Anspruchsvoll"
    ],
    [
        "verschlüsselt", "Adjektiv", "verschlüsselter", "am verschlüsseltsten",
        "Medien und Digitalisierung", "Kryptografie",
        "terenkripsi",
        "Sensible Bankdaten dürfen im Internet nur über streng verschlüsselte Verbindungen übertragen werden.",
        "Data perbankan sensitif hanya boleh ditransmisikan di internet melalui koneksi yang terenkripsi ketat.",
        "Mittel"
    ],
    [
        "Online-Portal", "Nomen", "das", "Online-Portale",
        "Medien und Digitalisierung", "Webplattformen",
        "portal web daring",
        "Bürger können ihren Wohnsitzwechsel inzwischen bequem über ein zentrales Online-Portal anmelden.",
        "Warga kini dapat melaporkan perpindahan domisili mereka dengan mudah melalui portal web daring terpusat.",
        "Leicht"
    ],
    [
        "Informationsüberflutung", "Nomen", "die", "Informationsüberflutungen",
        "Medien und Digitalisierung", "Medienkonsum",
        "kelebihan beban informasi / information overload",
        "Die ständige Erreichbarkeit und Push-Benachrichtigungen führen leicht zu belastender Informationsüberflutung.",
        "Keterjangkauan tanpa henti dan notifikasi pesan singkat mudah memicu kelebihan beban informasi yang melelahkan.",
        "Anspruchsvoll"
    ],
    [
        "Sendeformat", "Nomen", "das", "Sendeformate",
        "Medien und Digitalisierung", "Programmgestaltung",
        "format siaran acara",
        "Der öffentlich-rechtliche Sender entwickelte ein neues investigatives Sendeformat für junge Erwachsene.",
        "Stasiun penyiaran publik mengembangkan format siaran investigasi baru yang ditujukan bagi kalangan dewasa muda.",
        "Mittel"
    ],
    [
        "Schnittstelle", "Nomen", "die", "Schnittstellen",
        "Medien und Digitalisierung", "Systemarchitektur",
        "antarmuka penghubung / interface",
        "Die offene Schnittstelle ermöglicht den reibungslosen Datenaustausch zwischen verschiedenen Anwendungen.",
        "Antarmuka penghubung terbuka memungkinkan pertukaran data yang lancar antara berbagai aplikasi.",
        "Mittel"
    ],
    [
        "Breitbandausbau", "Nomen", "der", "Breitbandausbau (Sg.)",
        "Medien und Digitalisierung", "Infrastruktur",
        "perluasan jaringan pita lebar / fiber optik",
        "Ein flächendeckender Breitbandausbau ist das Fundament einer zukunftssicheren Digitalwirtschaft.",
        "Perluasan jaringan pita lebar yang merata ke seluruh pelosok merupakan pondasi ekonomi digital yang siap masa depan.",
        "Mittel"
    ],
    [
        "Rechnerleistung", "Nomen", "die", "Rechnerleistungen",
        "Medien und Digitalisierung", "Rechentechnik",
        "daya komputasi prosesor",
        "Moderne Algorithmen des maschinellen Lernens erfordern eine enorme Rechnerleistung hochmoderner Server.",
        "Algoritma pembelajaran mesin modern menuntut daya komputasi yang sangat besar dari server mutakhir.",
        "Mittel"
    ],

    # ==========================================
    # TOPIC 18: Kultur und Geschichte (16 entries)
    # ==========================================
    [
        "Geschichtsschreibung", "Nomen", "die", "Geschichtsschreibungen",
        "Kultur und Geschichte", "Historiografie",
        "historiografi / penulisan catatan sejarah",
        "Kritische Geschichtsschreibung hinterfragt einseitige Darstellungen historischer Ereignisse.",
        "Historiografi kritis mempertanyakan penggambaran sepihak atas peristiwa-peristiwa bersejarah.",
        "Anspruchsvoll"
    ],
    [
        "Traditionsbewusstsein", "Nomen", "das", "Traditionsbewusstsein (Sg.)",
        "Kultur und Geschichte", "Tradition",
        "kesadaran dan kepedulian menjaga tradisi",
        "Das ausgeprägte Traditionsbewusstsein der Region spiegelt sich in den jährlichen Handwerksfesten wider.",
        "Kesadaran menjaga tradisi yang kuat di kawasan tersebut tercermin dalam festival kerajinan tahunan.",
        "Mittel"
    ],
    [
        "Archiv", "Nomen", "das", "Archive",
        "Kultur und Geschichte", "Dokumentation",
        "arsip sejarah",
        "Im städtischen Archiv lagern wertvolle Dokumente aus dem späten Mittelalter.",
        "Di arsip kota tersimpan dokumen-dokumen berharga dari era akhir Abad Pertengahan.",
        "Mittel"
    ],
    [
        "Urkunde", "Nomen", "die", "Urkunden",
        "Kultur und Geschichte", "Urkundenwesen",
        "piagam / akta bersejarah",
        "Die kaiserliche Urkunde bestätigte der Stadt einst wichtige Handels- und Marktrechte.",
        "Piagam kekaisaran itu dahulu mengonfirmasi hak dagang dan pasar penting bagi kota tersebut.",
        "Mittel"
    ],
    [
        "Überlieferung", "Nomen", "die", "Überlieferungen",
        "Kultur und Geschichte", "Kulturerbe",
        "tradisi lisan / penuturan turun-temurun",
        "Mündliche Überlieferungen alter Sagen wurden erst Jahrhunderte später schriftlich festgehalten.",
        "Tradisi lisan dari dongeng-dongeng kuno baru dibukukan secara tertulis beberapa abad kemudian.",
        "Mittel"
    ],
    [
        "Wiederaufbau", "Nomen", "der", "Wiederaufbau (Sg.)",
        "Kultur und Geschichte", "Nachkriegszeit",
        "rekonstruksi / pembangunan kembali pascaperang",
        "Der zügige Wiederaufbau der zerstörten Kathedrale galt als Symbol der Hoffnung.",
        "Pembangunan kembali katedral yang hancur dengan cepat dipandang sebagai simbol harapan.",
        "Mittel"
    ],
    [
        "Museumsbesuch", "Nomen", "der", "Museumsbesuche",
        "Kultur und Geschichte", "Museen",
        "kunjungan ke museum",
        "Ein pädagogisch geführter Museumsbesuch vertieft das historische Verständnis von Schulklassen.",
        "Kunjungan ke museum yang dipandu secara pedagogis memperdalam pemahaman sejarah para siswa sekolah.",
        "Leicht"
    ],
    [
        "Geschichtsepoche", "Nomen", "die", "Geschichtsepochen",
        "Kultur und Geschichte", "Periodisierung",
        "zaman / kurun waktu sejarah",
        "Jede Geschichtsepoche hinterlässt ihre ganz eigenen Spuren in Architektur und Denken.",
        "Setiap kurun waktu sejarah meninggalkan jejak khasnya sendiri dalam arsitektur dan pemikiran.",
        "Anspruchsvoll"
    ],
    [
        "Zeitzeugnis", "Nomen", "das", "Zeitzeugnisse",
        "Kultur und Geschichte", "Gedächtnis",
        "bukti / saksi bisu sejarah sezaman",
        "Tagebücher einfacher Soldaten sind bewegende Zeitzeugnisse des vergangenen Jahrhunderts.",
        "Buku harian para prajurit biasa merupakan bukti sejarah yang mengharukan dari abad yang lalu.",
        "Anspruchsvoll"
    ],
    [
        "Völkerverständigung", "Nomen", "die", "Völkerverständigung (Sg.)",
        "Kultur und Geschichte", "Diplomatie",
        "saling pengertian antarbangsa / rekonsiliasi bangsa-bangsa",
        "Internationale Jugendaustauschprogramme leisten einen unschätzbaren Beitrag zur Völkerverständigung.",
        "Program pertukaran pemuda internasional memberikan kontribusi yang tak ternilai bagi saling pengertian antarbangsa.",
        "Anspruchsvoll"
    ],
    [
        "Theateraufführung", "Nomen", "die", "Theateraufführungen",
        "Kultur und Geschichte", "Bühnenkunst",
        "pementasan teater",
        "Die Premiere der neuen Theateraufführung wurde vom Premierenpublikum mit stehenden Ovationen gefeiert.",
        "Pertunjukan perdana pementasan teater baru tersebut disambut dengan tepuk tangan meriah sambil berdiri oleh penonton.",
        "Mittel"
    ],
    [
        "Stadtgeschichte", "Nomen", "die", "Stadtgeschichten",
        "Kultur und Geschichte", "Lokalgeschichte",
        "sejarah lokal perkotaan",
        "Wer sich mit der Stadtgeschichte befasst, versteht die bauliche Entwicklung der Altstadt besser.",
        "Siapa pun yang mempelajari sejarah perkotaan akan lebih memahami perkembangan arsitektur kota tua.",
        "Leicht"
    ],
    [
        "Kulturkreis", "Nomen", "der", "Kulturkreise",
        "Kultur und Geschichte", "Anthropologie",
        "lingkup kebudayaan",
        "Die Ausstellung vergleicht Hochzeitsbräuche aus verschiedenen Kulturkreisen rund um den Globus.",
        "Pameran tersebut membandingkan tradisi pernikahan dari berbagai lingkup kebudayaan di seluruh penjuru dunia.",
        "Mittel"
    ],
    [
        "Kulturschaffende", "Nomen", "der", "Kulturschaffenden",
        "Kultur und Geschichte", "Kulturszene",
        "pegiat seni dan budaya",
        "Zahlreiche Kulturschaffende demonstrierten friedlich für eine bessere finanzielle Förderung ihrer Projekte.",
        "Banyak pegiat seni dan budaya berdemonstrasi secara damai demi dukungan pendanaan yang lebih baik untuk proyek mereka.",
        "Anspruchsvoll"
    ],
    [
        "Prachtbau", "Nomen", "der", "Prachtbauten",
        "Kultur und Geschichte", "Baukunst",
        "gedung megah / bangunan bersejarah mewah",
        "Das Schloss am Flussufer gilt als prachtvoller Prachtbau des Barockzeitalters.",
        "Kastel di tepi sungai tersebut dianggap sebagai bangunan megah yang mewah dari era barok.",
        "Mittel"
    ],
    [
        "Ausstellungsstück", "Nomen", "das", "Ausstellungsstücke",
        "Kultur und Geschichte", "Museumsstücke",
        "benda pameran museum",
        "Das wertvollste Ausstellungsstück der Schau wird hinter speziellem Sicherheitsglas präsentiert.",
        "Benda pameran paling berharga dalam pameran tersebut disajikan di balik kaca pengaman khusus.",
        "Mittel"
    ],
]
