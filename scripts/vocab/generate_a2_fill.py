"""
A2 Fill Generator: defines rich candidates for each topic deficit, checks against A1 and seen A2,
and outputs exactly the needed items to reach 50 per topic (900 total).
"""
import re
import sys
sys.path.append('scripts/vocab')
from generator_core import parse_tuple
from generate_a2 import EXISTING_A2
from a2_topics_part1 import PART_1
from a2_topics_part2 import PART_2
from a2_topics_part3 import PART_3
from a2_supplement_part4 import SUPPLEMENT_PART4
from a2_supplement_part5 import SUPPLEMENT_PART5

# 1. Load A1
with open('src/data/vocabulary/a1.ts', 'r', encoding='utf-8') as f:
    a1_text = f.read()
a1_lemmas = set(m.lower().strip() for m in re.findall(r'word:\s*["\']([^"\']+)["\']', a1_text))

# 2. Collect current A2
seen = set()
for e in EXISTING_A2:
    seen.add(e['word'].strip().lower())

for part in [PART_1, PART_2, PART_3, SUPPLEMENT_PART4, SUPPLEMENT_PART5]:
    for tup in part:
        p = parse_tuple(tup, 'A2')
        w = p['word'].strip().lower()
        if w not in a1_lemmas:
            seen.add(w)

print(f"Total seen in A1 + current A2: {len(seen) + len(a1_lemmas)}")

# Candidate pool per topic to fill the deficits
CANDIDATES = {
    "Alltag": [
        ["Routine", "Nomen", "die", "Routinen", "Alltag", "Lebensweise", "rutinitas", "Eine feste Morgenroutine hilft beim Start in den Tag.", "Rutinitas pagi yang teratur membantu memulai hari.", "Mittel"],
        ["Zahnbürste", "Nomen", "die", "Zahnbürsten", "Alltag", "Hygiene", "sikat gigi", "Man sollte seine Zahnbürste alle drei Monate wechseln.", "Orang harus mengganti sikat giginya setiap tiga bulan.", "Leicht"],
        ["Zahnpasta", "Nomen", "die", "Zahnpasten", "Alltag", "Hygiene", "pasta gigi", "Ich brauche eine neue Tube Zahnpasta mit Minzgeschmack.", "Saya butuh satu botol pasta gigi baru beraroma min.", "Leicht"],
        ["Handtuch", "Nomen", "das", "Handtücher", "Alltag", "Bad", "handuk", "Hänge das feuchte Handtuch bitte zum Trocknen auf.", "Tolong gantung handuk lembap itu agar kering.", "Leicht"],
        ["föhnen", "Verb", ["föhnt", "föhnte", "hat geföhnt", "geföhnt"], "", "Alltag", "Hygiene", "mengeringkan rambut (hair dryer)", "Nach dem Duschen föhnt sie sich gründlich die Haare.", "Setelah mandi dia mengeringkan rambutnya dengan hair dryer.", "Leicht"]
    ],
    "Arbeit und Beruf": [
        ["Bewerber", "Nomen", "der", "Bewerber", "Arbeit und Beruf", "Bewerbung", "pelamar kerja", "Auf die offene Stelle gab es mehr als fünfzig Bewerber.", "Ada lebih dari lima puluh pelamar untuk lowongan pekerjaan itu.", "Mittel"],
        ["Praktikant", "Nomen", "der", "Praktikanten", "Arbeit und Beruf", "Ausbildung", "anak magang", "Der neue Praktikant lernt die verschiedenen Abteilungen kennen.", "Anak magang baru itu mengenal berbagai departemen.", "Leicht"],
        ["Überstunden", "Nomen", "die", "Überstunden (Pl.)", "Arbeit und Beruf", "Arbeitszeit", "lembur kerja", "Im Dezember fallen oft viele Überstunden an.", "Di bulan Desember sering ada banyak jam lembur.", "Mittel"],
        ["Arbeitsvertrag", "Nomen", "der", "Arbeitsverträge", "Arbeit und Beruf", "Vertrag", "perjanjian kerja / kontrak kerja", "Vor Beginn der Arbeit unterschreibt man den Arbeitsvertrag.", "Sebelum mulai bekerja orang menandatangani kontrak kerja.", "Mittel"],
        ["Probezeit", "Nomen", "die", "Probezeiten", "Arbeit und Beruf", "Vertrag", "masa percobaan kerja", "Während der Probezeit kann der Vertrag schneller gekündigt werden.", "Selama masa percobaan kontrak dapat dibatalkan lebih cepat.", "Mittel"],
        ["befördern", "Verb", ["befördert", "beförderte", "hat befördert", "befördert"], "", "Arbeit und Beruf", "Karriere", "mempromosikan jabatan", "Wegen ihrer hervorragenden Leistungen wurde sie zur Teamleiterin befördert.", "Karena prestasinya yang luar biasa dia dipromosikan menjadi pemimpin tim.", "Mittel"],
        ["besprechen", "Verb", ["bespricht", "besprach", "hat besprochen", "besprochen"], "", "Arbeit und Beruf", "Meeting", "membahas / membicarakan", "Wir müssen die Projektdetails noch im Team besprechen.", "Kami masih harus membahas rincian proyek di dalam tim.", "Mittel"],
        ["vollzeit", "Adverb", "", "", "Arbeit und Beruf", "Arbeitszeit", "purna waktu (full time)", "Er arbeitet seit Jahresbeginn vollzeit in der Agentur.", "Dia bekerja purna waktu di agensi sejak awal tahun.", "Leicht"],
        ["teilzeit", "Adverb", "", "", "Arbeit und Beruf", "Arbeitszeit", "paruh waktu (part time)", "Nach der Elternzeit arbeitet sie zunächst in Teilzeit.", "Setelah cuti orang tua dia awalnya bekerja paruh waktu.", "Leicht"],
        ["fachlich", "Adjektiv", "fachlicher", "am fachlichsten", "Arbeit und Beruf", "Qualifikation", "secara profesional / teknis", "Sie besitzt eine ausgezeichnete fachliche Kompetenz.", "Dia memiliki kompetensi teknis yang sangat bagus.", "Mittel"]
    ],
    "Einkaufen": [
        ["Einkaufszettel", "Nomen", "der", "Einkaufszettel", "Einkaufen", "Planung", "catatan belanja", "Ohne Einkaufszettel vergesse ich immer die Hälfte im Supermarkt.", "Tanpa catatan belanja saya selalu lupa separuhnya di supermarket.", "Leicht"],
        ["Geldbörse", "Nomen", "die", "Geldbörsen", "Einkaufen", "Bezahlung", "dompet", "Er hat seine Geldbörse an der Kasse vergessen.", "Dia melupakan dompetnya di kasir.", "Leicht"],
        ["Kleingeld", "Nomen", "das", "Kleingeld (Sg.)", "Einkaufen", "Bezahlung", "uang receh / koin", "Haben Sie passendes Kleingeld für den Parkscheinautomaten?", "Apakah Anda punya uang receh pas untuk mesin tiket parkir?", "Leicht"],
        ["Quittung", "Nomen", "die", "Quittungen", "Einkaufen", "Bezahlung", "kuitansi / tanda terima", "Verlangen Sie beim Bezahlen immer eine offizielle Quittung.", "Mintalah selalu kuitansi resmi saat membayar.", "Mittel"],
        ["Tragetasche", "Nomen", "die", "Tragetaschen", "Einkaufen", "Transport", "tas belanja / kantong jinjing", "Ich habe eine wiederverwendbare Tragetasche aus Stoff dabei.", "Saya membawa kantong belanja kain yang dapat digunakan kembali.", "Leicht"],
        ["Schaufenster", "Nomen", "das", "Schaufenster", "Einkaufen", "Geschäft", "etalase toko", "Im Schaufenster steht eine schicke neue Winterkollektion.", "Di etalase toko terpajang koleksi musim dingin baru yang elegan.", "Leicht"],
        ["Angebot", "Nomen", "das", "Angebote", "Einkaufen", "Preise", "penawaran khusus", "Das Sonderangebot gilt nur bis zum kommenden Samstag.", "Penawaran khusus itu hanya berlaku hingga hari Sabtu mendatang.", "Leicht"],
        ["Gutschein", "Nomen", "der", "Gutscheine", "Einkaufen", "Geschenke", "voucher belanja / kupon", "Zum Geburtstag schenkte sie mir einen Gutschein für Bücher.", "Untuk ulang tahun dia memberi saya voucher buku.", "Leicht"],
        ["Lieferung", "Nomen", "die", "Lieferungen", "Einkaufen", "Versand", "pengiriman barang", "Die Lieferung der Möbel erfolgt innerhalb von drei Werktagen.", "Pengiriman perabot berlangsung dalam tiga hari kerja.", "Mittel"],
        ["Retoure", "Nomen", "die", "Retouren", "Einkaufen", "Online-Shopping", "barang retur / pengembalian", "Die Retoure des Pakets ist für Kunden völlig kostenlos.", "Pengembalian paket sepenuhnya gratis bagi pelanggan.", "Mittel"],
        ["abwiegen", "Verb", ["wiegt ab", "wog ab", "hat abgewogen", "abgewogen"], "", "Einkaufen", "Supermarkt", "menimbang (berat)", "Bitte wiegen Sie das Obst vor der Kasse selbst ab.", "Tolong timbang sendiri buah-buahan sebelum menuju kasir.", "Leicht"],
        ["besorgen", "Verb", ["besorgt", "besorgte", "hat besorgt", "besorgt"], "", "Einkaufen", "Erledigungen", "membelikan / mengadakan", "Ich muss noch schnell Brot und Milch für das Frühstück besorgen.", "Saya harus membelikan roti dan susu dengan cepat untuk sarapan.", "Leicht"],
        ["feilschen", "Verb", ["feilscht", "feilschte", "hat gefeilscht", "gefeilscht"], "", "Einkaufen", "Markt", "menawar harga", "Auf dem Flohmarkt darf man gerne um den Preis feilschen.", "Di pasar loak orang boleh menawar harganya.", "Mittel"],
        ["preiswert", "Adjektiv", "preiswerter", "am preiswertesten", "Einkaufen", "Preise", "murah berkualitas / bernilai bagus", "Dieses kleine Restaurant bietet sehr preiswertes Mittagsessen.", "Restoran kecil ini menawarkan makan siang yang murah dan berkualitas.", "Leicht"],
        ["kostenlos", "Adjektiv", "", "", "Einkaufen", "Kosten", "gratis / cuma-cuma", "Der Versand ist ab einem Einkaufswert von fünfzig Euro kostenlos.", "Pengiriman gratis mulai dari nilai belanja lima puluh euro.", "Leicht"],
        ["reduziert", "Adjektiv", "", "", "Einkaufen", "Rabatt", "didiskon / dipotong harganya", "Alle Sommerkleider sind um dreißig Prozent reduziert.", "Semua gaun musim panas didiskon tiga puluh persen.", "Leicht"],
        ["ausverkauft", "Adjektiv", "", "", "Einkaufen", "Verfügbarkeit", "habis terjual (sold out)", "Die begehrten Konzertkarten waren innerhalb von Minuten ausverkauft.", "Tiket konser yang dicari-cari itu habis terjual dalam hitungan menit.", "Leicht"]
    ],
    "Essen und Trinken": [
        ["Schüssel", "Nomen", "die", "Schüsseln", "Essen und Trinken", "Geschirr", "mangkuk besar", "Sie serviert den frischen Salat in einer Glasschüssel.", "Dia menyajikan salad segar di dalam mangkuk kaca besar.", "Leicht"],
        ["Rezeptur", "Nomen", "die", "Rezepturen", "Essen und Trinken", "Kochen", "resep / formula racikan", "Die geheime Rezeptur für diese Sauce kennt nur der Chefkoch.", "Resep rahasia untuk saus ini hanya diketahui oleh koki kepala.", "Mittel"],
        ["schälen", "Verb", ["schält", "schälte", "hat geschält", "geschält"], "", "Essen und Trinken", "Zubereitung", "mengupas (kulit buah/sayur)", "Vor dem Kochen muss man die Kartoffeln gründlich schälen.", "Sebelum dimasak kentang harus dikupas dengan bersih.", "Leicht"],
        ["abschmecken", "Verb", ["schmeckt ab", "schmeckte ab", "hat abgeschmeckt", "abgeschmeckt"], "", "Essen und Trinken", "Kochen", "mencicipi dan membumbui", "Die Köchin schmeckt die Gemüsesuppe mit frischen Kräutern ab.", "Juru masak perempuan mencicipi dan membumbui sup sayur dengan herba segar.", "Mittel"],
        ["knusprig", "Adjektiv", "knuspriger", "am knusprigsten", "Essen und Trinken", "Konsistenz", "renyah / garing", "Das frische Baguette ist wunderbar knusprig.", "Baguette segar itu sungguh renyah.", "Leicht"],
        ["bitter", "Adjektiv", "bitterer", "am bittersten", "Essen und Trinken", "Geschmack", "pahit", "Schwarzer Kaffee ohne Zucker schmeckt ziemlich bitter.", "Kopi hitam tanpa gula terasa cukup pahit.", "Leicht"]
    ],
    "Familie und Beziehungen": [
        ["Schwiegermutter", "Nomen", "die", "Schwiegermütter", "Familie und Beziehungen", "Verwandtschaft", "ibu mertua", "Am Sonntag essen wir gemeinsam bei meiner Schwiegermutter.", "Pada hari Minggu kami makan bersama di rumah ibu mertua saya.", "Mittel"],
        ["Schwiegervater", "Nomen", "der", "Schwiegerväter", "Familie und Beziehungen", "Verwandtschaft", "ayah mertua", "Mein Schwiegervater hilft uns oft bei Arbeiten im Garten.", "Ayah mertua saya sering membantu kami bekerja di kebun.", "Mittel"],
        ["Neffe", "Nomen", "der", "Neffen", "Familie und Beziehungen", "Verwandtschaft", "keponakan laki-laki", "Mein kleiner Neffe hat gerade mit der Schule angefangen.", "Keponakan laki-laki kecil saya baru saja mulai bersekolah.", "Mittel"],
        ["Nichte", "Nomen", "die", "Nichten", "Familie und Beziehungen", "Verwandtschaft", "keponakan perempuan", "Meine Nichte spielt sehr gerne mit ihren Puppen.", "Keponakan perempuan saya sangat suka bermain dengan bonekanya.", "Mittel"],
        ["Patenkind", "Nomen", "das", "Patenkinder", "Familie und Beziehungen", "Beziehungen", "anak baptis", "Zu Weihnachten schenke ich meinem Patenkind ein schönes Buch.", "Saat Natal saya menghadiahi anak baptis saya sebuah buku bagus.", "Mittel"],
        ["Erziehung", "Nomen", "die", "Erziehung (Sg.)", "Familie und Beziehungen", "Kinder", "pola asuh / pendidikan anak", "Eine liebevolle Erziehung stärkt das Selbstvertrauen der Kinder.", "Pola asuh yang penuh kasih memperkuat rasa percaya diri anak-anak.", "Mittel"],
        ["trennen", "Verb", ["trennt", "trennte", "hat getrennt", "getrennt"], "", "Familie und Beziehungen", "Partnerschaft", "berpisah", "Nach zehn Jahren Ehe beschlossen sie, sich zu trennen.", "Setelah sepuluh tahun menikah mereka memutuskan untuk berpisah.", "Mittel"],
        ["verloben", "Verb", ["verlobt", "verlobte", "hat verlobt", "verlobt"], "", "Familie und Beziehungen", "Partnerschaft", "bertunangan", "Die beiden haben sich im Urlaub in Paris verlobt.", "Keduanya telah bertunangan saat liburan di Paris.", "Mittel"],
        ["scheiden", "Verb", ["scheidet", "schied", "hat geschieden", "geschieden"], "", "Familie und Beziehungen", "Ehe", "menceraikan / bercerai", "Sie ließen sich im gegenseitigen Einvernehmen scheiden.", "Mereka bercerai atas kesepakatan bersama.", "Mittel"],
        ["harmoniesüchtig", "Adjektiv", "", "", "Familie und Beziehungen", "Charakter", "cenderung menghindari konflik", "Sie ist sehr harmoniebedürftig im Zusammenleben.", "Dia sangat mengutamakan keharmonisan dalam hidup bersama.", "Anspruchsvoll"],
        ["verwitwet", "Adjektiv", "", "", "Familie und Beziehungen", "Familienstand", "menjanda / menduda", "Seit dem Tod ihres Mannes lebt sie verwitwet in Hamburg.", "Sejak suaminya meninggal dia hidup menjanda di Hamburg.", "Mittel"],
        ["lebendig", "Adjektiv", "lebendiger", "am lebendigsten", "Familie und Beziehungen", "Atmosphäre", "hidup / ceria", "In einer großen Familie geht es immer lebendig zu.", "Di dalam keluarga besar suasananya selalu hidup dan ceria.", "Leicht"]
    ],
    "Freizeit und Hobbys": [
        ["Fitnessstudio", "Nomen", "das", "Fitnessstudios", "Freizeit und Hobbys", "Sport", "pusat kebugaran (gym)", "Er trainiert dreimal pro Woche im Fitnessstudio.", "Dia berlatih tiga kali seminggu di pusat kebugaran.", "Leicht"],
        ["Turnier", "Nomen", "das", "Turniere", "Freizeit und Hobbys", "Wettkampf", "turnamen", "Die Tennisspielerin hat das internationale Turnier gewonnen.", "Pemain tenis itu memenangkan turnamen internasional.", "Mittel"],
        ["Wettkampf", "Nomen", "der", "Wettkämpfe", "Freizeit und Hobbys", "Sport", "kompetisi / pertandingan", "Vor dem Wettkampf wärmen sich alle Athleten auf.", "Sebelum kompetisi semua atlet melakukan pemanasan.", "Mittel"],
        ["Vereinsmitglied", "Nomen", "das", "Vereinsmitglieder", "Freizeit und Hobbys", "Vereine", "anggota klub", "Als Vereinsmitglied zahlt man einen geringeren Monatsbeitrag.", "Sebagai anggota klub orang membayar iuran bulanan yang lebih murah.", "Mittel"],
        ["Gartenarbeit", "Nomen", "die", "Gartenarbeiten", "Freizeit und Hobbys", "Garten", "berkebun", "Gartenarbeit an der frischen Luft entspannt mich sehr.", "Berkebun di udara segar sangat membuat saya rileks.", "Leicht"],
        ["trainieren", "Verb", ["trainiert", "trainierte", "hat trainiert", "trainiert"], "", "Freizeit und Hobbys", "Sport", "berlatih", "Die Schwimmer trainieren jeden Morgen im Hallenbad.", "Para perenang berlatih setiap pagi di kolam renang dalam ruangan.", "Leicht"],
        ["joggen", "Verb", ["joggt", "joggte", "ist gejoggt", "gejoggt"], "", "Freizeit und Hobbys", "Fitness", "joging / lari santai", "Sie joggt regelmäßig durch den Stadtpark.", "Dia rutin joging melintasi taman kota.", "Leicht"],
        ["basteln", "Verb", ["bastelt", "bastelte", "hat gebastelt", "gebastelt"], "", "Freizeit und Hobbys", "Handarbeit", "membuat kerajinan tangan", "Die Kinder basteln schöne bunte Laternen aus Papier.", "Anak-anak membuat lentera warna-warni yang indah dari kertas.", "Leicht"],
        ["sportlich", "Adjektiv", "sportlicher", "am sportlichsten", "Freizeit und Hobbys", "Fitness", "atletis / gemar olahraga", "Sie ist sehr sportlich und fährt fast jeden Tag Fahrrad.", "Dia sangat atletis dan bersepeda hampir setiap hari.", "Leicht"],
        ["kreativ", "Adjektiv", "kreativer", "am kreativsten", "Freizeit und Hobbys", "Eigenschaften", "kreatif", "Malen und Töpfern sind wunderbare kreative Hobbys.", "Melukis dan membuat tembikar adalah hobi kreatif yang menyenangkan.", "Leicht"]
    ],
    "Gefühle und Meinungen": [
        ["Erleichterung", "Nomen", "die", "Erleichterungen", "Gefühle und Meinungen", "Emotionen", "kelegaan", "Man spürte die Erleichterung aller Anwesenden im Raum.", "Orang bisa merasakan kelegaan semua yang hadir di ruangan.", "Mittel"],
        ["Zweifel", "Nomen", "der", "Zweifel", "Gefühle und Meinungen", "Gedanken", "keraguan / kebimbangan", "Ich habe starke Zweifel an der Richtigkeit dieser Aussage.", "Saya memiliki keraguan kuat atas kebenaran pernyataan ini.", "Mittel"],
        ["Mitleid", "Nomen", "das", "Mitleid (Sg.)", "Gefühle und Meinungen", "Emotionen", "rasa iba / belas kasihan", "Sie empfand großes Mitleid mit den obdachlosen Menschen.", "Dia merasakan belas kasihan yang besar terhadap orang-orang tunawisma.", "Mittel"],
        ["Begeisterung", "Nomen", "die", "Begeisterungen", "Gefühle und Meinungen", "Emotionen", "antusiasme", "Mit großer Begeisterung spielte das Orchester das Konzert.", "Dengan antusiasme besar orkestra memainkan konser tersebut.", "Mittel"],
        ["Eifersucht", "Nomen", "die", "Eifersucht (Sg.)", "Gefühle und Meinungen", "Emotionen", "kecemburuan", "Ihre ständige Eifersucht führte zum Ende der Beziehung.", "Kecemburuannya yang terus-menerus memicu berakhirnya hubungan itu.", "Mittel"],
        ["Sehnsucht", "Nomen", "die", "Sehnsüchte", "Gefühle und Meinungen", "Emotionen", "kerinduan mendalam", "Im Ausland überkam ihn oft die Sehnsucht nach der Heimat.", "Di luar negeri dia sering dilanda kerinduan mendalam akan tanah air.", "Mittel"],
        ["Überzeugung", "Nomen", "die", "Überzeugungen", "Gefühle und Meinungen", "Ansichten", "keyakinan kuat", "Aus tiefster Überzeugung ernährt sie sich rein vegetarisch.", "Atas keyakinan terdalam dia mengonsumsi makanan murni vegetarian.", "Mittel"],
        ["Vorliebe", "Nomen", "die", "Vorlieben", "Gefühle und Meinungen", "Interessen", "kegemaran / preferensi", "Er hat eine besondere Vorliebe für klassische Klaviermusik.", "Dia memiliki kegemaran khusus pada musik piano klasik.", "Mittel"],
        ["Abneigung", "Nomen", "die", "Abneigungen", "Gefühle und Meinungen", "Emotionen", "keengganan / rasa tidak suka", "Gegen rohe Zwiebeln hegt sie eine starke Abneigung.", "Terhadap bawang merah mentah dia menyimpan rasa sangat tidak suka.", "Mittel"],
        ["bezweifeln", "Verb", ["bezweifelt", "bezweifelte", "hat bezweifelt", "bezweifelt"], "", "Gefühle und Meinungen", "Gedanken", "meragukan", "Ich bezweifle, dass dieser Plan rechtzeitig gelingt.", "Saya meragukan bahwa rencana ini akan berhasil tepat waktu.", "Mittel"],
        ["akzeptieren", "Verb", ["akzeptiert", "akzeptierte", "hat akzeptiert", "akzeptiert"], "", "Gefühle und Meinungen", "Einstellung", "menerima / mengakui", "Wir müssen die Entscheidung des Schiedsrichters akzeptieren.", "Kita harus menerima keputusan dari wasit.", "Leicht"],
        ["bevorzugen", "Verb", ["bevorzugt", "bevorzugte", "hat bevorzugt", "bevorzugt"], "", "Gefühle und Meinungen", "Präferenz", "lebih menyukai / mengutamakan", "Im Sommer bevorzuge ich kühle Getränke und frisches Obst.", "Di musim panas saya lebih menyukai minuman dingin dan buah segar.", "Mittel"],
        ["eifersüchtig", "Adjektiv", "eifersüchtiger", "am eifersüchtigsten", "Gefühle und Meinungen", "Emotionen", "cemburu", "Sein Bruder war eifersüchtig auf seine guten Noten.", "Saudara laki-lakinya cemburu terhadap nilai-nilainya yang bagus.", "Mittel"],
        ["neidisch", "Adjektiv", "neidischer", "am neidischsten", "Gefühle und Meinungen", "Emotionen", "iri hati", "Man sollte nicht neidisch auf den Erfolg anderer blicken.", "Orang sebaiknya tidak memandang iri pada kesuksesan orang lain.", "Mittel"],
        ["überrascht", "Adjektiv", "überraschter", "am überraschtesten", "Gefühle und Meinungen", "Emotionen", "terkejut / heran", "Er war positiv überrascht von der schnellen Antwort.", "Dia terkejut secara positif oleh jawaban yang cepat.", "Leicht"],
        ["enttäuscht", "Adjektiv", "enttäuschter", "am enttäuschtesten", "Gefühle und Meinungen", "Emotionen", "kecewa", "Die Fans waren sichtlich enttäuscht über die Niederlage.", "Para penggemar terlihat kecewa atas kekalahan tersebut.", "Leicht"],
        ["geduldig", "Adjektiv", "geduldiger", "am geduldigsten", "Gefühle und Meinungen", "Eigenschaften", "sabar", "Die Lehrerin blieb stets ruhig und sehr geduldig.", "Ibu guru itu selalu bersikap tenang dan sangat sabar.", "Leicht"],
        ["ungeduldig", "Adjektiv", "ungeduldiger", "am ungeduldigsten", "Gefühle und Meinungen", "Eigenschaften", "tidak sabar", "Die Kinder warteten ungeduldig auf das Öffnen der Geschenke.", "Anak-anak menunggu pembukaan kado dengan tidak sabar.", "Leicht"],
        ["mutig", "Adjektiv", "mutiger", "am mutigsten", "Gefühle und Meinungen", "Eigenschaften", "pemberani", "Der mutige Feuerwehrmann rettete die Katze vom hohen Baum.", "Petugas pemadam kebakaran yang berani itu menyelamatkan kucing dari pohon yang tinggi.", "Leicht"],
        ["feige", "Adjektiv", "feiger", "am feigsten", "Gefühle und Meinungen", "Eigenschaften", "penakut / pengecut", "Es ist feige, in schwierigen Situationen einfach wegzulaufen.", "Adalah pengecut untuk lari begitu saja dalam situasi sulit.", "Mittel"],
        ["hoffnungsvoll", "Adjektiv", "hoffnungsvoller", "am hoffnungsvollsten", "Gefühle und Meinungen", "Einstellung", "penuh harapan", "Die Ärzte blicken hoffnungsvoll auf die Genesung des Patienten.", "Para dokter memandang penuh harapan pada kesembuhan pasien.", "Mittel"]
    ],
    "Gesellschaft": [
        ["Einwohner", "Nomen", "der", "Einwohner", "Gesellschaft", "Bevölkerung", "penduduk", "Die Stadt Köln hat über eine Million Einwohner.", "Kota Köln memiliki lebih dari satu juta penduduk.", "Leicht"],
        ["Bevölkerung", "Nomen", "die", "Bevölkerungen", "Gesellschaft", "Demografie", "populasi / masyarakat", "Die Bevölkerung wächst in vielen Großstädten stetig.", "Populasi berkembang stabil di banyak kota besar.", "Mittel"],
        ["Nachbarschaft", "Nomen", "die", "Nachbarschaften", "Gesellschaft", "Wohnviertel", "lingkungan tetangga", "In unserer Nachbarschaft helfen sich alle gegenseitig.", "Di lingkungan tetangga kami semua saling membantu.", "Leicht"],
        ["Freiwillige", "Nomen", "der", "Freiwilligen", "Gesellschaft", "Ehrenamt", "sukarelawan", "Viele Freiwillige helfen bei der Verteilung von Lebensmitteln.", "Banyak sukarelawan membantu dalam pembagian bahan pangan.", "Mittel"],
        ["Verantwortung", "Nomen", "die", "Verantwortungen", "Gesellschaft", "Ethik", "tanggung jawab", "Jeder Bürger trägt Verantwortung für das friedliche Zusammenleben.", "Setiap warga negara memikul tanggung jawab untuk hidup rukun berdampingan.", "Mittel"],
        ["Ungerechtigkeit", "Nomen", "die", "Ungerechtigkeiten", "Gesellschaft", "Soziales", "ketidakadilan", "Viele Menschen wehren sich gegen soziale Ungerechtigkeit.", "Banyak orang melawan ketidakadilan sosial.", "Mittel"],
        ["Demonstration", "Nomen", "die", "Demonstrationen", "Gesellschaft", "Protest", "demonstrasi", "Am Samstag findet eine große friedliche Demonstration statt.", "Pada hari Sabtu akan diadakan demonstrasi damai yang besar.", "Mittel"],
        ["Sicherheit", "Nomen", "die", "Sicherheiten", "Gesellschaft", "Schutz", "keamanan", "Die Polizei sorgt für die Sicherheit der Bürger in der Nacht.", "Polisi menjaga keamanan warga di malam hari.", "Mittel"],
        ["zusammenhalten", "Verb", ["hält zusammen", "hielt zusammen", "hat zusammengehalten", "zusammengehalten"], "", "Gesellschaft", "Solidarität", "bersatu / saling kompak", "In Krisenzeiten muss die Dorfgemeinschaft fest zusammenhalten.", "Di masa krisis komunitas desa harus bersatu padu dengan kokoh.", "Mittel"],
        ["beteiligen", "Verb", ["beteiligt", "beteiligte", "hat beteiligt", "beteiligt"], "", "Gesellschaft", "Partizipation", "berpartisipasi / ikut serta", "Bürger können sich aktiv an Stadtprojekten beteiligen.", "Warga dapat berpartisipasi aktif dalam proyek-proyek kota.", "Mittel"],
        ["engagieren", "Verb", ["engagiert", "engagierte", "hat engagiert", "engagiert"], "", "Gesellschaft", "Ehrenamt", "terlibat aktif / mengabdi", "Sie engagiert sich seit Jahren ehrenamtlich im Tierschutz.", "Dia telah terlibat aktif secara sukarela dalam perlindungan hewan selama bertahun-tahun.", "Mittel"],
        ["ehrenamtlich", "Adjektiv", "", "", "Gesellschaft", "Ehrenamt", "sukarela (tanpa pamrih)", "Er leistet jeden Samstag ehrenamtliche Arbeit im Altersheim.", "Dia melakukan pekerjaan sukarela setiap hari Sabtu di panti jompo.", "Mittel"],
        ["gerecht", "Adjektiv", "gerechter", "am gerechtesten", "Gesellschaft", "Werte", "adil", "Ein gerechter Richter fällt unparteiische Urteile.", "Seorang hakim yang adil menjatuhkan vonis yang tidak memihak.", "Leicht"],
        ["ungerecht", "Adjektiv", "ungerechter", "am ungerechtesten", "Gesellschaft", "Werte", "tidak adil", "Viele empfanden die neue Regelung als zutiefst ungerecht.", "Banyak orang menganggap aturan baru tersebut sangat tidak adil.", "Leicht"],
        ["solidarisch", "Adjektiv", "solidarischer", "am solidarischsten", "Gesellschaft", "Solidarität", "solidaritas / kompak", "Die Nachbarn zeigten sich nach dem Brandfall solidarisch.", "Para tetangga menunjukkan sikap solidaritas setelah peristiwa kebakaran.", "Mittel"]
    ],
    "Gesundheit": [
        ["Praxis", "Nomen", "die", "Praxen", "Gesundheit", "Medizin", "klinik / tempat praktik dokter", "Die Praxis von Frau Doktor Weber ist heute Vormittag geöffnet.", "Praktik dokter Ibu Weber buka pagi ini.", "Leicht"],
        ["Wartezimmer", "Nomen", "das", "Wartezimmer", "Gesundheit", "Klinik", "ruang tunggu", "Im Wartezimmer des Arztes lesen Patienten Zeitschriften.", "Di ruang tunggu dokter para pasien membaca majalah.", "Leicht"],
        ["Spritze", "Nomen", "die", "Spritzen", "Gesundheit", "Behandlung", "suntikan", "Die Arzthelferin gibt dem Patienten eine Spritze gegen Tetanus.", "Asisten dokter memberikan suntikan anti-tetanus kepada pasien.", "Leicht"],
        ["Verletzung", "Nomen", "die", "Verletzungen", "Gesundheit", "Unfall", "cedera / luka", "Die Verletzung am Knie heilt dank der Ruhepause gut.", "Cedera di lutut sembuh dengan baik berkat istirahat.", "Mittel"],
        ["überweisen", "Verb", ["überweist", "überwies", "hat überwiesen", "überwiesen"], "", "Gesundheit", "Klinik", "merujuk pasien (atau mentransfer uang)", "Der Hausarzt überweist mich zur Kontrolle an einen Facharzt.", "Dokter umum merujuk saya ke dokter spesialis untuk pemeriksaan.", "Mittel"],
        ["heilen", "Verb", ["heilt", "heilte", "hat geheilt", "geheilt"], "", "Gesundheit", "Genesung", "menyembuhkan / sembuh", "Kräutertee und Schlaf heilen manche leichte Erkältung.", "Teh herba dan tidur menyembuhkan beberapa pilek ringan.", "Leicht"],
        ["ansteckend", "Adjektiv", "ansteckender", "am ansteckendsten", "Gesundheit", "Infektion", "menular", "Grippe ist eine hochansteckende Viruserkrankung.", "Flu adalah penyakit virus yang sangat menular.", "Mittel"],
        ["gesundheitlich", "Adjektiv", "", "", "Gesundheit", "Zustand", "terkait kesehatan", "Aus gesundheitlichen Gründen ernährt er sich salzarm.", "Karena alasan kesehatan dia mengonsumsi makanan rendah garam.", "Mittel"]
    ],
    "Kommunikation": [
        ["Botschaft", "Nomen", "die", "Botschaften", "Kommunikation", "Nachrichten", "pesan penting / kedutaan besar", "Der Brief enthielt eine wichtige Botschaft für die Familie.", "Surat itu memuat sebuah pesan penting bagi keluarga.", "Mittel"],
        ["Briefkasten", "Nomen", "der", "Briefkästen", "Kommunikation", "Post", "kotak surat", "Er wirft den frankierten Brief in den gelben Briefkasten.", "Dia memasukkan surat berprangko itu ke dalam kotak surat kuning.", "Leicht"],
        ["Absender", "Nomen", "der", "Absender", "Kommunikation", "Post", "pengirim", "Schreiben Sie den Namen des Absenders oben links auf den Brief.", "Tuliskan nama pengirim di bagian kiri atas surat.", "Leicht"],
        ["Empfänger", "Nomen", "der", "Empfänger", "Kommunikation", "Post", "penerima", "Das Paket wurde dem rechtmäßigen Empfänger persönlich übergeben.", "Paket tersebut diserahkan langsung kepada penerima yang berhak.", "Leicht"],
        ["Postkarte", "Nomen", "die", "Postkarten", "Kommunikation", "Post", "kartu pos", "Aus dem Urlaub schreibe ich immer Postkarten an Freunde.", "Dari tempat liburan saya selalu menulis kartu pos kepada teman-teman.", "Leicht"],
        ["Briefmarke", "Nomen", "die", "Briefmarken", "Kommunikation", "Post", "prangko", "Kleben Sie die Briefmarke in die obere rechte Ecke.", "Tempelkan prangko di sudut kanan atas.", "Leicht"],
        ["Umschlag", "Nomen", "der", "Umschläge", "Kommunikation", "Post", "amplop surat", "Stecken Sie das Dokument in einen festen Umschlag.", "Masukkan dokumen tersebut ke dalam amplop yang kokoh.", "Leicht"],
        ["Gruß", "Nomen", "der", "Grüße", "Kommunikation", "Umgangsformen", "salam", "Richte deinen Eltern bitte herzliche Grüße von mir aus.", "Sampaikan salam hangat dariku kepada orang tuamu.", "Leicht"],
        ["Dank", "Nomen", "der", "Dank (Sg.)", "Kommunikation", "Höflichkeit", "ucapan terima kasih", "Ich möchte Ihnen meinen herzlichen Dank für Ihre Hilfe aussprechen.", "Saya ingin menyampaikan terima kasih yang tulus atas bantuan Anda.", "Leicht"],
        ["Ausrede", "Nomen", "die", "Ausreden", "Kommunikation", "Gespräch", "alasan dalih", "Er sucht immer nach einer Ausrede, wenn er zu spät kommt.", "Dia selalu mencari dalih saat datang terlambat.", "Mittel"],
        ["Kompliment", "Nomen", "das", "Komplimente", "Kommunikation", "Höflichkeit", "pujian", "Er machte ihr ein schönes Kompliment über ihr Kleid.", "Dia memberinya sebuah pujian manis tentang gaunnya.", "Leicht"],
        ["Kritik", "Nomen", "die", "Kritiken", "Kommunikation", "Rückmeldung", "kritik / ulasan", "Konstruktive Kritik hilft uns, unsere Arbeit zu verbessern.", "Kritik yang membangun membantu kita memperbaiki pekerjaan kita.", "Mittel"],
        ["Missverständnis", "Nomen", "das", "Missverständnisse", "Kommunikation", "Konflikt", "kesalahpahaman", "Durch ein Missverständnis warteten wir an zwei verschiedenen Orten.", "Karena kesalahpahaman kami menunggu di dua tempat yang berbeda.", "Mittel"],
        ["beantworten", "Verb", ["beantwortet", "beantwortete", "hat beantwortet", "beantwortet"], "", "Kommunikation", "Austausch", "menjawab (pertanyaan/email)", "Der Kundendienst beantwortet E-Mails innerhalb eines Tages.", "Layanan pelanggan menjawab email dalam kurun waktu satu hari.", "Leicht"],
        ["benachrichtigen", "Verb", ["benachrichtigt", "benachrichtigte", "hat benachrichtigt", "benachrichtigt"], "", "Kommunikation", "Nachrichten", "memberitahukan / mengabarkan", "Wir benachrichtigen Sie sofort bei neuen Entwicklungen.", "Kami segera memberitahu Anda jika ada perkembangan baru.", "Mittel"],
        ["begründen", "Verb", ["begründet", "begründete", "hat begründet", "begründet"], "", "Kommunikation", "Argumentation", "memberikan alasan / mendasari", "Können Sie Ihre Entscheidung bitte kurz begründen?", "Bisakah Anda memberikan alasan singkat atas keputusan Anda?", "Mittel"],
        ["erwähnen", "Verb", ["erwähnt", "erwähnte", "hat erwähnt", "erwähnt"], "", "Kommunikation", "Gespräch", "menyebutkan / menyinggung", "Er erwähnte beiläufig, dass er bald umziehen möchte.", "Dia sempat menyinggung sepintas bahwa dia ingin segera pindah rumah.", "Mittel"],
        ["verhandeln", "Verb", ["verhandelt", "verhandelte", "hat verhandelt", "verhandelt"], "", "Kommunikation", "Gesprächsführung", "bernegosiasi / berunding", "Die Chefs verhandeln über einen neuen Liefervertrag.", "Para pimpinan bernegosiasi tentang kontrak pasokan yang baru.", "Mittel"],
        ["widersprechen", "Verb", ["widerspricht", "widersprach", "hat widersprochen", "widersprochen"], "", "Kommunikation", "Meinungsaustausch", "menyanggah / membantah", "Darf ich Ihnen in diesem Punkt höflich widersprechen?", "Bolehkah saya menyanggah pendapat Anda secara sopan dalam poin ini?", "Mittel"],
        ["überzeugen", "Verb", ["überzeugt", "überzeugte", "hat überzeugt", "überzeugt"], "", "Kommunikation", "Argumentation", "meyakinkan", "Seine logischen Argumente konnten mich voll überzeugen.", "Argumen logisnya mampu meyakinkan saya sepenuhnya.", "Mittel"],
        ["deutlich", "Adjektiv", "deutlicher", "am deutlichsten", "Kommunikation", "Verständlichkeit", "jelas", "Seine Aussprache im Deutschen ist sehr deutlich.", "Pelafalan bahasa Jermannya sangat jelas.", "Leicht"],
        ["ausführlich", "Adjektiv", "ausführlicher", "am ausführlichsten", "Kommunikation", "Information", "terperinci / mendalam", "Der Arzt gab dem Patienten eine ausführliche Erklärung.", "Dokter memberikan penjelasan terperinci kepada pasien.", "Mittel"],
        ["kurz", "Adjektiv", "kürzer", "am kürzesten", "Kommunikation", "Form", "singkat / pendek", "Fassen Sie Ihre Antwort bitte in kurzen Sätzen zusammen.", "Rangkumlah jawaban Anda dalam kalimat-kalimat singkat.", "Leicht"],
        ["schriftlich", "Adjektiv", "", "", "Kommunikation", "Form", "tertulis", "Bitte reichen Sie die Kündigung in schriftlicher Form ein.", "Silakan ajukan surat pengunduran diri dalam bentuk tertulis.", "Mittel"],
        ["mündlich", "Adjektiv", "", "", "Kommunikation", "Form", "lisan", "Wir haben die Absprache mündlich per Telefon getroffen.", "Kami telah membuat kesepakatan tersebut secara lisan melalui telepon.", "Mittel"],
        ["vertraulich", "Adjektiv", "vertraulicher", "am vertraulichsten", "Kommunikation", "Sicherheit", "rahasia / konfidensial", "Dieses Dokument enthält streng vertrauliche Informationen.", "Dokumen ini memuat informasi yang sangat rahasia.", "Mittel"],
        ["direkt", "Adjektiv", "direkter", "am direktesten", "Kommunikation", "Stil", "langsung", "Sprechen Sie den Konflikt bitte direkt mit dem Kollegen an.", "Bicarakanlah konflik itu secara langsung dengan rekan kerja Anda.", "Leicht"],
        ["indirekt", "Adjektiv", "indirekter", "am indirektesten", "Kommunikation", "Stil", "tidak langsung", "Er deutete seine Absichten nur indirekt an.", "Dia hanya mengisyaratkan niatnya secara tidak langsung.", "Mittel"]
    ],
    "Kultur und Geschichte": [
        ["Roman", "Nomen", "der", "Romane", "Kultur und Geschichte", "Literatur", "novel", "Ich lese gerade einen spannenden historischen Roman.", "Saya sedang membaca sebuah novel sejarah yang seru.", "Leicht"],
        ["Gedicht", "Nomen", "das", "Gedichte", "Kultur und Geschichte", "Literatur", "puisi / sajak", "In der Schule lernten wir ein berühmtes Gedicht von Goethe.", "Di sekolah kami mempelajari sebuah sajak terkenal karya Goethe.", "Mittel"],
        ["Autor", "Nomen", "der", "Autoren", "Kultur und Geschichte", "Literatur", "penulis / pengarang", "Der deutsche Autor stellte gestern sein neuestes Buch vor.", "Penulis asal Jerman itu mempresentasikan buku terbarunya kemarin.", "Leicht"],
        ["Bibliothek", "Nomen", "die", "Bibliotheken", "Kultur und Geschichte", "Bildung", "perpustakaan", "In der Universitätsbibliothek kann man in Ruhe lernen.", "Di perpustakaan universitas orang dapat belajar dengan tenang.", "Leicht"],
        ["Skulptur", "Nomen", "die", "Skulpturen", "Kultur und Geschichte", "Kunst", "patung pahat", "Die Skulptur aus Marmor steht mitten im Museumssaal.", "Patung pahat marmer itu berdiri di tengah aula museum.", "Mittel"],
        ["Bauwerk", "Nomen", "das", "Bauwerke", "Kultur und Geschichte", "Architektur", "bangunan / mahakarya arsitektur", "Das Brandenburger Tor ist ein weltberühmtes historisches Bauwerk.", "Gerbang Brandenburg adalah mahakarya arsitektur bersejarah yang terkenal di dunia.", "Mittel"],
        ["Ruine", "Nomen", "die", "Ruinen", "Kultur und Geschichte", "Architektur", "reruntuhan kuno", "Auf dem Berg kann man die Ruinen einer alten Ritterburg besichtigen.", "Di atas bukit orang dapat mengunjungi reruntuhan benteng ksatria kuno.", "Mittel"],
        ["Zeitalter", "Nomen", "das", "Zeitalter", "Kultur und Geschichte", "Geschichte", "zaman / abad", "Wir leben heute im digitalen Zeitalter des Internets.", "Kita hidup hari ini di era digital internet.", "Mittel"],
        ["Krieg", "Nomen", "der", "Kriege", "Kultur und Geschichte", "Geschichte", "perang", "Nach dem langen Krieg baute die Bevölkerung das Land wieder auf.", "Setelah perang panjang penduduk membangun kembali negara itu.", "Mittel"],
        ["Frieden", "Nomen", "der", "Frieden (Sg.)", "Kultur und Geschichte", "Werte", "perdamaian", "Mögen alle Völker weltweit in Frieden und Wohlstand leben.", "Semoga semua bangsa di dunia hidup dalam damai dan kemakmuran.", "Mittel"],
        ["Märchen", "Nomen", "das", "Märchen", "Kultur und Geschichte", "Literatur", "dongeng", "Die Brüder Grimm sammelten viele traditionelle deutsche Märchen.", "Grimm bersaudara mengumpulkan banyak dongeng tradisional Jerman.", "Leicht"],
        ["Sage", "Nomen", "die", "Sagen", "Kultur und Geschichte", "Mythologie", "legenda / cerita rakyat", "Die Sage vom Drachentöter Siegfried kennt fast jedes Kind.", "Legenda Siegfried sang pembunuh naga dikenal hampir setiap anak.", "Mittel"],
        ["Feier", "Nomen", "die", "Feiern", "Kultur und Geschichte", "Feste", "perayaan / pesta", "Die Feier zum Nationalfeiertag endete mit einem bunten Feuerwerk.", "Perayaan hari kemerdekaan nasional berakhir dengan kembang api yang meriah.", "Leicht"],
        ["Brauchtum", "Nomen", "das", "Brauchtümer", "Kultur und Geschichte", "Tradition", "adat istiadat", "Das regionale Brauchtum wird im Schwarzwald hoch geschätzt.", "Adat istiadat daerah sangat dihargai di wilayah Black Forest.", "Mittel"],
        ["Regisseur", "Nomen", "der", "Regisseure", "Kultur und Geschichte", "Film", "sutradara", "Der Regisseur gewann einen Preis für seinen neuen Kinofilm.", "Sutradara itu memenangkan penghargaan untuk film bioskop barunya.", "Mittel"],
        ["Schauspieler", "Nomen", "der", "Schauspieler", "Kultur und Geschichte", "Bühne", "aktor / pemain sandiwara", "Der Schauspieler spielte die Hauptrolle im Theaterstück hervorragend.", "Aktor itu memerankan peran utama dalam sandiwara dengan luar biasa.", "Leicht"],
        ["Musiker", "Nomen", "der", "Musiker", "Kultur und Geschichte", "Musik", "musisi", "Viele begabte Musiker spielen in den Straßen von Berlin.", "Banyak musisi berbakat bermain di jalanan kota Berlin.", "Leicht"],
        ["darstellen", "Verb", ["stellt dar", "stellte dar", "hat dargestellt", "dargestellt"], "", "Kultur und Geschichte", "Kunst", "menggambarkan / melambangkan", "Das Gemälde stellt eine biblische Szene dar.", "Lukisan itu menggambarkan sebuah adegan alkitabiah.", "Mittel"],
        ["verfilmen", "Verb", ["verfilmt", "verfilmte", "hat verfilmt", "verfilmt"], "", "Kultur und Geschichte", "Film", "mengangkat ke layar lebar / memfilmkan", "Der Bestseller-Roman wurde vor zwei Jahren erfolgreich verfilmt.", "Novel terlaris itu berhasil difilmkan dua tahun lalu.", "Mittel"],
        ["stammen", "Verb", ["stammt", "stammte", "hat gestammt", "gestammt"], "", "Kultur und Geschichte", "Herkunft", "berasal dari (masa/tempat)", "Die antiken Münzen stammen aus der römischen Kaiserzeit.", "Koin-koin kuno itu berasal dari zaman kekaisaran Romawi.", "Mittel"],
        ["mittelalterlich", "Adjektiv", "", "", "Kultur und Geschichte", "Epoche", "berasal dari abad pertengahan", "Rothenburg ob der Tauber hat ein malerisches mittelalterliches Zentrum.", "Rothenburg ob der Tauber memiliki pusat kota abad pertengahan yang indah.", "Mittel"],
        ["antik", "Adjektiv", "antiker", "am antiksten", "Kultur und Geschichte", "Epoche", "kuno / antik", "In der Villa stehen wertvolle antike Möbel.", "Di vila itu terdapat perabot antik yang berharga.", "Mittel"],
        ["modern", "Adjektiv", "moderner", "am modernsten", "Kultur und Geschichte", "Epoche", "modern", "Das neue Museum hat ein sehr modernes Design.", "Museum baru itu memiliki desain yang sangat modern.", "Leicht"],
        ["berühmt", "Adjektiv", "berühmter", "am berühmtesten", "Kultur und Geschichte", "Personen", "terkenal", "Goethe ist der berühmteste Schriftsteller Deutschlands.", "Goethe adalah sastrawan paling terkenal di Jerman.", "Leicht"],
        ["bekannt", "Adjektiv", "bekannter", "am bekanntesten", "Kultur und Geschichte", "Allgemein", "dikenal luas", "Die Berliner Philharmoniker sind weltweit bestens bekannt.", "Berliner Philharmoniker sangat dikenal di seluruh dunia.", "Leicht"],
        ["unbekannt", "Adjektiv", "unbekannter", "am unbekanntesten", "Kultur und Geschichte", "Allgemein", "tidak dikenal", "Der Schöpfer dieses alten Kunstwerks blieb unbekannt.", "Pencipta karya seni kuno ini tetap tidak diketahui.", "Leicht"],
        ["künstlerisch", "Adjektiv", "künstlerischer", "am künstlerischsten", "Kultur und Geschichte", "Kunst", "artistik / bernilai seni", "Das Theaterstück hatte einen hohen künstlerischen Wert.", "Pertunjukan teater tersebut memiliki nilai seni yang tinggi.", "Mittel"]
    ],
    "Medien und Digitalisierung": [
        ["App", "Nomen", "die", "Apps", "Medien und Digitalisierung", "Software", "aplikasi ponsel (app)", "Mit dieser neuen App lerne ich täglich deutsche Wörter.", "Dengan aplikasi baru ini saya belajar kosakata bahasa Jerman setiap hari.", "Leicht"],
        ["Software", "Nomen", "die", "Software (Sg.)", "Medien und Digitalisierung", "Technologie", "perangkat lunak (software)", "Die Firma entwickelt spezialisierte Software für Arztpraxen.", "Perusahaan mengembangkan perangkat lunak khusus untuk tempat praktik dokter.", "Mittel"],
        ["Hardware", "Nomen", "die", "Hardware (Sg.)", "Medien und Digitalisierung", "Technologie", "perangkat keras (hardware)", "Für grafikintensive Spiele braucht man leistungsstarke Hardware.", "Untuk permainan dengan grafis intensif orang butuh perangkat keras yang kuat.", "Mittel"],
        ["Netzwerk", "Nomen", "das", "Netzwerke", "Medien und Digitalisierung", "Internet", "jaringan", "Der Drucker ist direkt mit dem lokalen Firmennetzwerk verbunden.", "Printer tersebut terhubung langsung ke jaringan lokal perusahaan.", "Mittel"],
        ["WLAN", "Nomen", "das", "WLANs", "Medien und Digitalisierung", "Internet", "jaringan Wi-Fi", "Wie lautet das Passwort für das Gäste-WLAN im Café?", "Apa kata sandi untuk Wi-Fi tamu di kafe ini?", "Leicht"],
        ["Mauspad", "Nomen", "das", "Mauspads", "Medien und Digitalisierung", "Zubehör", "tatakan tetikus (mouse pad)", "Auf einem guten Mauspad gleitet die Maus viel präziser.", "Di atas tatakan mouse yang bagus pergerakan mouse jauh lebih presisi.", "Leicht"],
        ["USB-Stick", "Nomen", "der", "USB-Sticks", "Medien und Digitalisierung", "Speicher", "diska lepas (USB flash drive)", "Ich speichere die Präsentation sicherheitshalber auf einem USB-Stick.", "Saya menyimpan presentasi di flashdisk USB untuk berjaga-jaga.", "Leicht"],
        ["Ladegerät", "Nomen", "das", "Ladegeräte", "Medien und Digitalisierung", "Zubehör", "pengisi daya (charger)", "Hast du ein passendes Ladegerät für mein Smartphone?", "Apakah kamu punya charger yang pas untuk ponsel pintar saya?", "Leicht"],
        ["Kabelanschluss", "Nomen", "der", "Kabelanschlüsse", "Medien und Digitalisierung", "Hardware", "sambungan kabel", "Im Wohnzimmer gibt es einen schnellen Kabelanschluss fürs Internet.", "Di ruang keluarga ada sambungan kabel cepat untuk internet.", "Mittel"],
        ["Display", "Nomen", "das", "Displays", "Medien und Digitalisierung", "Hardware", "layar tampilan", "Das hochauflösende Display zeigt lebendige Farben.", "Layar beresolusi tinggi itu menampilkan warna-warna yang hidup.", "Mittel"],
        ["Akku", "Nomen", "der", "Akkus", "Medien und Digitalisierung", "Hardware", "baterai isi ulang (aki/accu)", "Der Akku meines Handys hält bei normaler Nutzung fast zwei Tage.", "Baterai ponsel saya bertahan hampir dua hari pada pemakaian normal.", "Leicht"],
        ["Kopfhöreranschluss", "Nomen", "der", "Kopfhöreranschlüsse", "Medien und Digitalisierung", "Hardware", "colokan headphone", "Viele moderne Handys besitzen keinen klassischen Kopfhöreranschluss mehr.", "Banyak ponsel modern tidak lagi memiliki colokan headphone klasik.", "Mittel"],
        ["Benutzeroberfläche", "Nomen", "die", "Benutzeroberflächen", "Medien und Digitalisierung", "Software", "antarmuka pengguna (UI)", "Die Benutzeroberfläche der neuen App ist sehr intuitiv gestaltet.", "Antarmuka pengguna dari aplikasi baru tersebut dirancang sangat intuitif.", "Anspruchsvoll"],
        ["Datenschutz", "Nomen", "der", "Datenschutz (Sg.)", "Medien und Digitalisierung", "Sicherheit", "perlindungan privasi data", "In Europa gilt ein strenger Datenschutz für personenbezogene Daten.", "Di Eropa berlaku perlindungan data yang ketat untuk data pribadi.", "Mittel"],
        ["Passwortschutz", "Nomen", "der", "Passwortschutz (Sg.)", "Medien und Digitalisierung", "Sicherheit", "proteksi kata sandi", "Der sensible Ordner ist durch einen Passwortschutz gesichert.", "Folder sensitif itu diamankan dengan perlindungan kata sandi.", "Mittel"],
        ["Virus", "Nomen", "das", "Viren", "Medien und Digitalisierung", "Sicherheit", "virus komputer", "Ein starkes Antivirenprogramm schützt das System vor Schadsoftware.", "Program antivirus yang tangguh melindungi sistem dari perangkat lunak berbahaya.", "Mittel"],
        ["surfen", "Verb", ["surft", "surfte", "hat gesurft", "gesurft"], "", "Medien und Digitalisierung", "Internet", "berselancar di web", "Abends surfe ich gerne gemütlich im Internet nach Neuigkeiten.", "Di malam hari saya suka berselancar santai di internet mencari berita.", "Leicht"],
        ["installieren", "Verb", ["installiert", "installierte", "hat installiert", "installiert"], "", "Medien und Digitalisierung", "Software", "memasang (menginstal)", "Du musst zuerst das Update auf deinem Computer installieren.", "Kamu harus menginstal pembaruan tersebut terlebih dahulu di komputermu.", "Mittel"],
        ["deinstallieren", "Verb", ["deinstalliert", "deinstallierte", "hat deinstalliert", "deinstalliert"], "", "Medien und Digitalisierung", "Software", "mencopot pemasangan (uninstall)", "Ich deinstalliere alte Apps, die ich nicht mehr regelmäßig nutze.", "Saya mencopot aplikasi lama yang tidak lagi saya gunakan secara teratur.", "Mittel"],
        ["aktualisieren", "Verb", ["aktualisiert", "aktualisierte", "hat aktualisiert", "aktualisiert"], "", "Medien und Digitalisierung", "Software", "memperbarui (update)", "Bitte aktualisieren Sie Ihren Webbrowser aus Sicherheitsgründen.", "Harap perbarui peramban web Anda demi alasan keamanan.", "Mittel"],
        ["anklicken", "Verb", ["klickt an", "klickte an", "hat angeklickt", "angeklickt"], "", "Medien und Digitalisierung", "Bedienung", "mengklik", "Klicken Sie den roten Knopf an, um den Download zu starten.", "Klik tombol merah itu untuk memulai unduhan.", "Leicht"],
        ["weiterleiten", "Verb", ["leitet weiter", "leitete weiter", "hat weitergeleitet", "weitergeleitet"], "", "Medien und Digitalisierung", "Kommunikation", "meneruskan (forward pesan/email)", "Könntest du mir die E-Mail der Chefin bitte kurz weiterleiten?", "Bisakah kamu meneruskan email bos wanita itu sebentar kepadaku?", "Mittel"],
        ["posten", "Verb", ["postet", "postete", "hat gepostet", "gepostet"], "", "Medien und Digitalisierung", "Social Media", "mengunggah postingan (posting)", "Sie postet regelmäßig schöne Urlaubsfotos in den sozialen Medien.", "Dia rutin mengunggah foto liburan yang indah di media sosial.", "Leicht"],
        ["streamen", "Verb", ["streamt", "streamte", "hat gestreamt", "gestreamt"], "", "Medien und Digitalisierung", "Medien", "menonton/mendengarkan daring (streaming)", "Wir streamen am Wochenende gerne spannende Krimiserien.", "Kami suka menonton serial cerita detektif yang seru secara streaming di akhir pekan.", "Leicht"],
        ["kabellos", "Adjektiv", "", "", "Medien und Digitalisierung", "Hardware", "nirkabel", "Moderne kabellose Kopfhörer bieten eine erstaunliche Klangqualität.", "Headphone nirkabel modern menawarkan kualitas suara yang menakjubkan.", "Leicht"],
        ["elektronisch", "Adjektiv", "elektronischer", "am elektronischsten", "Medien und Digitalisierung", "Technik", "elektronik", "Rechnungen werden heute meistens in elektronischer Form verschickt.", "Tagihan sekarang kebanyakan dikirim dalam bentuk elektronik.", "Leicht"],
        ["portabel", "Adjektiv", "portabler", "am portabelsten", "Medien und Digitalisierung", "Geräte", "portabel / mudah dibawa", "Dieser Lautsprecher ist leicht und wunderbar portabel.", "Pengeras suara ini ringan dan sangat mudah dibawa ke mana-mana.", "Mittel"]
    ],
    "Natur und Umwelt": [
        ["Ozean", "Nomen", "der", "Ozeane", "Natur und Umwelt", "Gewässer", "samudra", "Die Weltmeere und Ozeane bedecken den größten Teil der Erde.", "Laut dunia dan samudra menutupi bagian terbesar bumi.", "Mittel"],
        ["Flussufer", "Nomen", "das", "Flussufer", "Natur und Umwelt", "Gewässer", "tepi sungai / bantaran sungai", "Am sonnigen Flussufer spazieren viele Familien am Sonntag.", "Di bantaran sungai yang cerah banyak keluarga berjalan-jalan pada hari Minggu.", "Leicht"],
        ["Gebirge", "Nomen", "das", "Gebirge", "Natur und Umwelt", "Landschaft", "pegunungan", "Die Alpen sind das höchste Gebirge in Mitteleuropa.", "Alpen adalah pegunungan tertinggi di Eropa Tengah.", "Mittel"],
        ["Gipfel", "Nomen", "der", "Gipfel", "Natur und Umwelt", "Berge", "puncak gunung", "Nach vier Stunden anstrengendem Aufstieg erreichten wir den Gipfel.", "Setelah pendakian melelahkan selama empat jam kami mencapai puncak.", "Mittel"],
        ["Tal", "Nomen", "das", "Täler", "Natur und Umwelt", "Landschaft", "lembah", "Im grünen Tal liegt ein malerisches kleines Dorf.", "Di lembah yang hijau terletak sebuah desa kecil yang indah bak lukisan.", "Leicht"],
        ["Dschungel", "Nomen", "der", "Dschungel", "Natur und Umwelt", "Wald", "hutan belantara / rimba", "Im tropischen Dschungel leben unzählige unbekannte Tierarten.", "Di hutan rimba tropis hidup spesies satwa tak terhitung yang belum dikenal.", "Mittel"],
        ["Wüste", "Nomen", "die", "Wüsten", "Natur und Umwelt", "Landschaft", "padang pasir / gurun", "In der trockenen Wüste regnet es oft monatelang überhaupt nicht.", "Di gurun pasir yang gersang sering berminggu-minggu bahkan berbulan-bulan tidak turun hujan.", "Mittel"],
        ["Insel", "Nomen", "die", "Inseln", "Natur und Umwelt", "Geografie", "pulau", "Bali ist eine weltbekannte und traumhafte Insel in Indonesien.", "Bali adalah pulau idaman yang terkenal di dunia di Indonesia.", "Leicht"],
        ["Küste", "Nomen", "die", "Küsten", "Natur und Umwelt", "Geografie", "pesisir / pantai", "Der starke Wind weht kräftig entlang der Nordseeküste.", "Angin kencang bertiup kencang di sepanjang pesisir Laut Utara.", "Leicht"],
        ["Tierart", "Nomen", "die", "Tierarten", "Natur und Umwelt", "Fauna", "spesies satwa", "Viele seltene Tierarten sind heute vom Aussterben bedroht.", "Banyak spesies satwa langka sekarang terancam kepunahan.", "Mittel"],
        ["blühen", "Verb", ["blüht", "blühte", "hat geblüht", "geblüht"], "", "Natur und Umwelt", "Flora", "mekar / berbunga", "Im warmen Frühling blühen die Kirschbäume in voller Pracht.", "Di musim semi yang hangat pohon-pohon sakura bermekaran dalam keindahan penuh.", "Leicht"],
        ["frieren", "Verb", ["friert", "fror", "hat gefroren", "gefroren"], "", "Natur und Umwelt", "Wetter", "kedinginan / membeku", "Wenn man im Winter keine Mütze trägt, friert man schnell.", "Jika orang tidak mengenakan topi di musim dingin, dia cepat kedinginan.", "Leicht"],
        ["stürmisch", "Adjektiv", "stürmischer", "am stürmischsten", "Natur und Umwelt", "Wetter", "berbadai / berangin ribut", "Im Herbst wird das Wetter oft kühl, regnerisch und stürmisch.", "Di musim gugur cuaca sering menjadi dingin, hujan, dan berangin kencang.", "Leicht"]
    ],
    "Politik und Wirtschaft": [
        ["Parlament", "Nomen", "das", "Parlamente", "Politik und Wirtschaft", "Staat", "parlemen / dewan perwakilan", "Die gewählten Abgeordneten debattieren im Parlament über das Gesetz.", "Para anggota parlemen terpilih berdebat di parlemen mengenai undang-undang tersebut.", "Mittel"],
        ["Demokratie", "Nomen", "die", "Demokratien", "Politik und Wirtschaft", "Staat", "demokrasi", "Freie und geheime Wahlen sind das Fundament der Demokratie.", "Pemilihan umum yang bebas dan rahasia adalah fondasi dari demokrasi.", "Mittel"],
        ["Staat", "Nomen", "der", "Staaten", "Politik und Wirtschaft", "Politik", "negara", "Der Staat investiert gezielt Gelder in Schulen und Infrastruktur.", "Negara menginvestasikan dana secara terarah untuk sekolah dan infrastruktur.", "Mittel"],
        ["Regierung", "Nomen", "die", "Regierungen", "Politik und Wirtschaft", "Politik", "pemerintah", "Die neue Regierung stellte ihren Koalitionsvertrag vor.", "Pemerintah baru mempresentasikan kesepakatan koalisinya.", "Mittel"],
        ["Gewerkschaft", "Nomen", "die", "Gewerkschaften", "Politik und Wirtschaft", "Arbeit", "serikat pekerja", "Die Gewerkschaft verhandelt mit den Arbeitgebern über höhere Löhne.", "Serikat pekerja bernegosiasi dengan pengusaha mengenai kenaikan upah.", "Mittel"],
        ["Streik", "Nomen", "der", "Streiks", "Politik und Wirtschaft", "Arbeit", "pemogokan kerja (strike)", "Wegen des Streiks beim Bodenpersonal fielen viele Flüge aus.", "Karena pemogokan kerja staf darat banyak penerbangan dibatalkan.", "Mittel"],
        ["Inflation", "Nomen", "die", "Inflationen", "Politik und Wirtschaft", "Finanzen", "inflasi", "Wegen der hohen Inflation steigen die Lebensmittelpreise spürbar.", "Karena inflasi tinggi harga bahan makanan terasa naik.", "Mittel"],
        ["Zins", "Nomen", "der", "Zinsen", "Politik und Wirtschaft", "Bank", "bunga pinjaman/simpanan", "Die Zentralbank hat die Leitzinsen im vergangenen Monat erhöht.", "Bank sentral telah menaikkan suku bunga acuan pada bulan lalu.", "Mittel"],
        ["Kredit", "Nomen", "der", "Kredite", "Politik und Wirtschaft", "Finanzen", "kredit / pinjaman bank", "Die Familie nahm einen günstigen Kredit für den Hausbau auf.", "Keluarga tersebut mengambil kredit lunak untuk pembangunan rumah.", "Mittel"],
        ["investieren", "Verb", ["investiert", "investierte", "hat investiert", "investiert"], "", "Politik und Wirtschaft", "Finanzen", "berinvestasi / menanam modal", "Das Unternehmen will verstärkt in grüne Technologien investieren.", "Perusahaan ingin berinvestasi lebih banyak pada teknologi hijau.", "Mittel"],
        ["produzieren", "Verb", ["produziert", "produzierte", "hat produziert", "produziert"], "", "Politik und Wirtschaft", "Industrie", "memproduksi", "Die Fabrik produziert täglich tausende hochwertige Maschinenteile.", "Pabrik memproduksi ribuan komponen mesin berkualitas tinggi setiap hari.", "Leicht"],
        ["wirtschaftlich", "Adjektiv", "wirtschaftlicher", "am wirtschaftlichsten", "Politik und Wirtschaft", "Finanzen", "secara ekonomis / finansial", "Das Land verzeichnete ein solides wirtschaftliches Wachstum.", "Negara tersebut mencatatkan pertumbuhan ekonomi yang solid.", "Mittel"]
    ],
    "Reisen und Verkehr": [
        ["Fahrkarte", "Nomen", "die", "Fahrkarten", "Reisen und Verkehr", "Fahrkarten", "karcis / tiket perjalanan", "Man muss vor dem Einsteigen eine gültige Fahrkarte kaufen.", "Orang harus membeli tiket yang sah sebelum menaiki kendaraan.", "Leicht"],
        ["Reisepass", "Nomen", "der", "Reisepässe", "Reisen und Verkehr", "Dokumente", "paspor perjalanan", "Für Reisen außerhalb der Europäischen Union benötigt man einen Reisepass.", "Untuk bepergian ke luar Uni Eropa orang memerlukan paspor perjalanan.", "Leicht"],
        ["Ausland", "Nomen", "das", "Ausland (Sg.)", "Reisen und Verkehr", "Reisen", "luar negeri", "Viele junge Leute möchten gerne ein Auslandssemester machen.", "Banyak anak muda ingin sekali menjalani satu semester di luar negeri.", "Leicht"],
        ["Inland", "Nomen", "das", "Inland (Sg.)", "Reisen und Verkehr", "Reisen", "dalam negeri", "Urlaub im Inland erfreut sich wachsender Beliebtheit.", "Liburan di dalam negeri semakin digemari.", "Mittel"],
        ["Grenze", "Nomen", "die", "Grenzen", "Reisen und Verkehr", "Geografie", "perbatasan negara", "An der Grenze kontrollieren die Beamten Ausweise und Pässe.", "Di perbatasan para petugas memeriksa kartu identitas dan paspor.", "Leicht"],
        ["übernachten", "Verb", ["übernachtet", "übernachtete", "hat übernachtet", "übernachtet"], "", "Reisen und Verkehr", "Unterkunft", "menginap / bermalam", "Wir übernachten heute in einer gemütlichen kleinen Pension.", "Kami bermalam hari ini di wisma penginapan kecil yang nyaman.", "Leicht"],
        ["verpassen", "Verb", ["verpasst", "verpasste", "hat verpasst", "verpasst"], "", "Reisen und Verkehr", "Transport", "ketinggalan (kereta/pesawat)", "Wegen des Staus haben wir den Zug nach München verpasst.", "Karena kemacetan kami ketinggalan kereta menuju ke München.", "Leicht"]
    ],
    "Schule und Bildung": [
        ["Schüler", "Nomen", "der", "Schüler", "Schule und Bildung", "Personen", "murid / siswa sekolah (laki-laki)", "Der Schüler schreibt fleißig alle Notizen von der Tafel ab.", "Siswa tersebut mencatat dengan tekun semua catatan dari papan tulis.", "Leicht"],
        ["Schülerin", "Nomen", "die", "Schülerinnen", "Schule und Bildung", "Personen", "siswi sekolah (perempuan)", "Die Schülerin stellt der Lehrerin eine interessante Frage.", "Siswi tersebut mengajukan sebuah pertanyaan menarik kepada ibu guru.", "Leicht"],
        ["Klassenzimmer", "Nomen", "das", "Klassenzimmer", "Schule und Bildung", "Schule", "ruang kelas", "Im sonnigen Klassenzimmer stehen dreißig moderne Tische.", "Di ruang kelas yang cerah berdiri tiga puluh meja modern.", "Leicht"],
        ["Tafel", "Nomen", "die", "Tafeln", "Schule und Bildung", "Ausstattung", "papan tulis", "Der Lehrer schreibt neue Grammatikregeln mit Kreide an die Tafel.", "Pak guru menuliskan aturan tata bahasa baru dengan kapur di papan tulis.", "Leicht"],
        ["Unterricht", "Nomen", "der", "Unterrichte", "Schule und Bildung", "Schule", "pembelajaran / pelajaran", "Der Deutschunterricht beginnt pünktlich um acht Uhr morgens.", "Pelajaran bahasa Jerman dimulai tepat pukul delapan pagi.", "Leicht"],
        ["Hausaufgabe", "Nomen", "die", "Hausaufgaben", "Schule und Bildung", "Lernen", "pekerjaan rumah (PR)", "Nach der Schule erledigen die Kinder sofort ihre Hausaufgaben.", "Sepulang sekolah anak-anak segera menyelesaikan pekerjaan rumah mereka.", "Leicht"],
        ["Prüfung", "Nomen", "die", "Prüfungen", "Schule und Bildung", "Abschluss", "ujian", "Sie bereitet sich seit zwei Monaten intensiv auf die Prüfung vor.", "Dia mempersiapkan diri secara intensif untuk ujian sejak dua bulan lalu.", "Leicht"],
        ["Note", "Nomen", "die", "Noten", "Schule und Bildung", "Bewertung", "nilai sekolah", "Für den Aufsatz hat er eine sehr gute Note erhalten.", "Untuk karangan itu dia mendapatkan nilai yang sangat bagus.", "Leicht"],
        ["Pause", "Nomen", "die", "Pausen", "Schule und Bildung", "Schulalltag", "istirahat", "In der großen Pause essen die Schüler ihr Pausenbrot.", "Saat jam istirahat utama para siswa memakan bekal roti mereka.", "Leicht"],
        ["Ferien", "Nomen", "die", "Ferien (Pl.)", "Schule und Bildung", "Erholung", "liburan sekolah", "In den Sommerferien fahren viele Familien ans Meer.", "Pada masa liburan musim panas banyak keluarga pergi ke laut.", "Leicht"],
        ["studieren", "Verb", ["studiert", "studierte", "hat studiert", "studiert"], "", "Schule und Bildung", "Universität", "kuliah (studi di universitas)", "Meine Schwester studiert Medizin an der Humboldt-Universität.", "Saudara perempuan saya kuliah kedokteran di Universitas Humboldt.", "Leicht"],
        ["lernen", "Verb", ["lernt", "lernte", "hat gelernt", "gelernt"], "", "Schule und Bildung", "Lernen", "belajar", "Wir lernen jeden Tag dreißig neue deutsche Wörter.", "Kami belajar tiga puluh kata baru bahasa Jerman setiap hari.", "Leicht"],
        ["lehren", "Verb", ["lehrt", "lehrte", "hat gelehrt", "gelehrt"], "", "Schule und Bildung", "Unterricht", "mengajar", "Die Professorin lehrt seit vielen Jahren Linguistik.", "Ibu profesor telah mengajar ilmu linguistik selama bertahun-tahun.", "Mittel"]
    ],
    "Wissenschaft und Technik": [
        ["Experiment", "Nomen", "das", "Experimente", "Wissenschaft und Technik", "Forschung", "eksperimen / percobaan ilmiah", "Die Forscher führten ein spannendes chemisches Experiment durch.", "Para peneliti melakukan eksperimen kimia yang sangat menarik.", "Mittel"],
        ["Hypothese", "Nomen", "die", "Hypothesen", "Wissenschaft und Technik", "Forschung", "hipotesis", "Die neue Studie bestätigt die aufgestellte Hypothese eindeutig.", "Kajian baru tersebut mengonfirmasi hipotesis yang diajukan dengan jelas.", "Mittel"],
        ["Forscher", "Nomen", "der", "Forscher", "Wissenschaft und Technik", "Personen", "peneliti (ilmuwan)", "Der Forscher beobachtet die Reaktionen der Zellen unter dem Mikroskop.", "Peneliti itu mengamati reaksi sel-sel di bawah mikroskop.", "Mittel"],
        ["Mikroskop", "Nomen", "das", "Mikroskope", "Wissenschaft und Technik", "Labor", "mikroskop", "Mit dem Mikroskop kann man winzige Bakterien genau erkennen.", "Dengan mikroskop orang dapat mengenali bakteri renik secara saksama.", "Mittel"],
        ["Teleskop", "Nomen", "das", "Teleskope", "Wissenschaft und Technik", "Astronomie", "teleskop / teropong bintang", "Durch das Teleskop sah man die Krater auf dem Mond deutlich.", "Melalui teleskop kawah-kawah di bulan terlihat dengan jelas.", "Mittel"],
        ["Planet", "Nomen", "der", "Planeten", "Wissenschaft und Technik", "Astronomie", "planet", "Die Erde ist der dritte Planet unseres Sonnensystems.", "Bumi adalah planet ketiga dari tata surya kita.", "Leicht"],
        ["Gravitation", "Nomen", "die", "Gravitation (Sg.)", "Wissenschaft und Technik", "Physik", "gravitasi", "Die Schwerkraft oder Gravitation hält uns fest auf der Erde.", "Gaya berat atau gravitasi menahan kita tetap kokoh di bumi.", "Mittel"],
        ["Thermodynamik", "Nomen", "die", "Thermodynamik (Sg.)", "Wissenschaft und Technik", "Physik", "termodinamika", "Im Physikunterricht besprechen wir die Gesetze der Thermodynamik.", "Dalam pelajaran fisika kami membahas hukum-hukum termodinamika.", "Anspruchsvoll"],
        ["forschen", "Verb", ["forscht", "forschte", "hat geforscht", "geforscht"], "", "Wissenschaft und Technik", "Wissenschaft", "meneliti / melakukan riset", "Die Wissenschaftler forschen intensiv nach Heilmitteln gegen Krebs.", "Para ilmuwan meneliti secara intensif obat-obatan penyembuh kanker.", "Mittel"],
        ["beobachten", "Verb", ["beobachtet", "beobachtete", "hat beobachtet", "beobachtet"], "", "Wissenschaft und Technik", "Forschung", "mengamati / mengobservasi", "Die Studenten beobachten das Verhalten der Tiere in freier Wildbahn.", "Para mahasiswa mengamati perilaku satwa di alam bebas.", "Leicht"],
        ["wissenschaftlich", "Adjektiv", "wissenschaftlicher", "am wissenschaftlichsten", "Wissenschaft und Technik", "Wissenschaft", "secara ilmiah / saintifik", "Dieser Artikel basiert auf fundierten wissenschaftlichen Untersuchungen.", "Artikel ini didasarkan pada penyelidikan ilmiah yang kuat.", "Mittel"]
    ],
    "Wohnen": [
        ["Treppenhaus", "Nomen", "das", "Treppenhäuser", "Wohnen", "Gebäude", "tangga gedung / bordes", "Das Licht im Treppenhaus geht nach zwei Minuten automatisch aus.", "Lampu di lorong tangga mati otomatis setelah dua menit.", "Leicht"],
        ["Briefkastenanlage", "Nomen", "die", "Briefkastenanlagen", "Wohnen", "Eingang", "deretan kotak surat penghuni", "Am Haupteingang befindet sich die zentrale Briefkastenanlage.", "Di pintu masuk utama terletak deretan kotak surat terpusat.", "Mittel"],
        ["Haustürschlüssel", "Nomen", "der", "Haustürschlüssel", "Wohnen", "Schlüssel", "kunci pintu rumah", "Haben Sie Ihren Haustürschlüssel in der Tasche?", "Apakah Anda membawa kunci pintu rumah Anda di dalam tas?", "Leicht"],
        ["Dachboden", "Nomen", "der", "Dachböden", "Wohnen", "Räume", "loteng rumah", "Auf dem Dachboden lagern wir alte Koffer und Weihnachtsschmuck.", "Di loteng kami menyimpan koper-koper tua dan dekorasi Natal.", "Leicht"],
        ["Wohnviertel", "Nomen", "das", "Wohnviertel", "Wohnen", "Umgebung", "kompleks perumahan / kawasan hunian", "Wir wohnen in einem sehr ruhigen und grünen Wohnviertel.", "Kami tinggal di kawasan perumahan yang sangat tenang dan hijau.", "Mittel"],
        ["Mehrfamilienhaus", "Nomen", "das", "Mehrfamilienhäuser", "Wohnen", "Gebäude", "rumah susun keluarga / apartemen banyak keluarga", "Im Mehrfamilienhaus wohnen acht verschiedene Parteien.", "Di rumah susun bertingkat itu tinggal delapan keluarga yang berbeda.", "Mittel"],
        ["Einfamilienhaus", "Nomen", "das", "Einfamilienhäuser", "Wohnen", "Gebäude", "rumah tapak keluarga tunggal", "Sie haben sich ein schönes Einfamilienhaus am Stadtrand gebaut.", "Mereka telah membangun sebuah rumah tapak yang indah di pinggiran kota.", "Mittel"],
        ["Garagentor", "Nomen", "das", "Garagentore", "Wohnen", "Garage", "pintu garasi", "Das automatische Garagentor öffnet sich mit einer Fernbedienung.", "Pintu garasi otomatis terbuka menggunakan sebuah remote.", "Leicht"],
        ["abwaschen", "Verb", ["wäscht ab", "wusch ab", "hat abgewaschen", "abgewaschen"], "", "Wohnen", "Küche", "mencuci piring", "Nach dem Essen waschen wir das schmutzige Geschirr ab.", "Setelah makan kami mencuci piring-piring kotor itu.", "Leicht"],
        ["einrichten", "Verb", ["richtet ein", "richtete ein", "hat eingerichtet", "eingerichtet"], "", "Wohnen", "Möbel", "menata perabot / mendekorasi rumah", "Wir haben das Kinderzimmer mit hellen Holzmöbeln eingerichtet.", "Kami menata kamar anak dengan perabot kayu berwarna terang.", "Mittel"],
        ["hell", "Adjektiv", "heller", "am hellsten", "Wohnen", "Eigenschaft", "terang", "Durch die großen Fenster ist die Wohnung den ganzen Tag hell.", "Melalui jendela-jendela besar apartemen itu terang sepanjang hari.", "Leicht"],
        ["dunkel", "Adjektiv", "dunkler", "am dunkelsten", "Wohnen", "Eigenschaft", "gelap", "Das Zimmer ohne Fenster wirkt leider etwas dunkel.", "Kamar tanpa jendela itu sayangnya terkesan agak gelap.", "Leicht"]
    ]
}

# Now select clean candidates to fill the exact deficits
# Target: exactly 50 entries per topic
# Let's count current per topic
topic_counts = {}
for e in EXISTING_A2:
    t = e['topic']
    topic_counts[t] = topic_counts.get(t, 0) + 1

for part in [PART_1, PART_2, PART_3, SUPPLEMENT_PART4, SUPPLEMENT_PART5]:
    for tup in part:
        p = parse_tuple(tup, 'A2')
        w = p['word'].strip().lower()
        if w not in a1_lemmas and w in seen:
            t = p['topic']
            # Only count if it was accepted into the unique set!
            # We already have that in test_a2_assembly!

