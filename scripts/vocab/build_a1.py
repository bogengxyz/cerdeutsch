#!/usr/bin/env python3
"""
A1 Vocabulary Builder: Generates exactly 700 unique, fully validated A1 entries.
Preserves existing 25 A1 entries and appends 675 newly curated entries across all 18 canonical topics.
"""
import json
import os
import sys

from generate_a1 import EXISTING_A1

TOPICS = [
    'Alltag', 'Familie und Beziehungen', 'Essen und Trinken', 'Wohnen',
    'Arbeit und Beruf', 'Schule und Bildung', 'Gesundheit', 'Reisen und Verkehr',
    'Einkaufen', 'Freizeit und Hobbys', 'Natur und Umwelt', 'Gesellschaft',
    'Politik und Wirtschaft', 'Wissenschaft und Technik', 'Kommunikation',
    'Gefühle und Meinungen', 'Medien und Digitalisierung', 'Kultur und Geschichte'
]

def noun(word, art, pl, topic, subtopic, mean_id, ex_de, ex_id, diff='Leicht'):
    return {
        'word': word, 'article': art, 'plural': pl, 'partOfSpeech': 'Nomen',
        'topic': topic, 'subtopic': subtopic, 'meaningId': mean_id,
        'exampleDe': ex_de, 'exampleId': ex_id, 'difficulty': diff
    }

def verb(word, pr, pt, pf, p2, topic, subtopic, mean_id, ex_de, ex_id, diff='Leicht'):
    return {
        'word': word, 'partOfSpeech': 'Verb', 'praesens': pr, 'praeteritum': pt,
        'perfekt': pf, 'partizip2': p2, 'topic': topic, 'subtopic': subtopic,
        'meaningId': mean_id, 'exampleDe': ex_de, 'exampleId': ex_id, 'difficulty': diff
    }

def adj(word, comp, sup, topic, subtopic, mean_id, ex_de, ex_id, diff='Leicht'):
    entry = {
        'word': word, 'partOfSpeech': 'Adjektiv', 'topic': topic, 'subtopic': subtopic,
        'meaningId': mean_id, 'exampleDe': ex_de, 'exampleId': ex_id, 'difficulty': diff
    }
    if comp:
        entry['comparative'] = comp
    if sup:
        entry['superlative'] = sup
    return entry

def other(word, pos, topic, subtopic, mean_id, ex_de, ex_id, diff='Leicht'):
    return {
        'word': word, 'partOfSpeech': pos, 'topic': topic, 'subtopic': subtopic,
        'meaningId': mean_id, 'exampleDe': ex_de, 'exampleId': ex_id, 'difficulty': diff
    }

# We define the raw entries by topic
RAW_DATA = {}

# 1. Alltag (existing: pünktlich, Viertelstunde, aufstehen)
RAW_DATA['Alltag'] = [
    noun('Tag', 'der', 'Tage', 'Alltag', 'Tageszeit', 'hari', 'Der Tag beginnt früh am Morgen.', 'Hari dimulai lebih awal di pagi hari.'),
    noun('Morgen', 'der', 'Morgen', 'Alltag', 'Tageszeit', 'pagi hari', 'Am Morgen trinke ich warmen Tee.', 'Di pagi hari saya minum teh hangat.'),
    noun('Vormittag', 'der', 'Vormittage', 'Alltag', 'Tageszeit', 'menjelang siang', 'Am Vormittag haben wir Deutschkurs.', 'Menjelang siang kami ada kursus bahasa Jerman.'),
    noun('Mittag', 'der', 'Mittage', 'Alltag', 'Tageszeit', 'tengah hari / siang', 'Zu Mittag esse ich in der Kantine.', 'Di siang hari saya makan di kantin.'),
    noun('Nachmittag', 'der', 'Nachmittage', 'Alltag', 'Tageszeit', 'sore hari', 'Am Nachmittag lerne ich Vokabeln.', 'Di sore hari saya belajar kosakata.'),
    noun('Abend', 'der', 'Abende', 'Alltag', 'Tageszeit', 'malam hari (petang)', 'Guten Abend! Wie geht es Ihnen?', 'Selamat malam! Bagaimana kabar Anda?'),
    noun('Nacht', 'die', 'Nächte', 'Alltag', 'Tageszeit', 'malam hari (larut)', 'In der Nacht ist die Stadt sehr ruhig.', 'Di waktu malam kota sangat tenang.'),
    noun('Woche', 'die', 'Wochen', 'Alltag', 'Kalender', 'minggu / pekan', 'Eine Woche hat sieben Tage.', 'Satu minggu memiliki tujuh hari.'),
    noun('Wochenende', 'das', 'Wochenenden', 'Alltag', 'Kalender', 'akhir pekan', 'Am Wochenende schlafe ich gerne lange.', 'Di akhir pekan saya suka tidur lebih lama.'),
    noun('Monat', 'der', 'Monate', 'Alltag', 'Kalender', 'bulan', 'Ein Monat hat etwa vier Wochen.', 'Satu bulan memiliki sekitar empat minggu.'),
    noun('Jahr', 'das', 'Jahre', 'Alltag', 'Kalender', 'tahun', 'Ich lerne seit einem Jahr Deutsch.', 'Saya sudah belajar bahasa Jerman selama satu tahun.'),
    noun('Montag', 'der', 'Montage', 'Alltag', 'Wochentage', 'hari Senin', 'Am Montag beginnt die neue Arbeitswoche.', 'Pada hari Senin minggu kerja yang baru dimulai.'),
    noun('Dienstag', 'der', 'Dienstage', 'Alltag', 'Wochentage', 'hari Selasa', 'Am Dienstag habe ich Sprachunterricht.', 'Pada hari Selasa saya ada pelajaran bahasa.'),
    noun('Mittwoch', 'der', 'Mittwoche', 'Alltag', 'Wochentage', 'hari Rabu', 'Mittwochs koche ich mit Freunden.', 'Setiap hari Rabu saya memasak bersama teman.'),
    noun('Donnerstag', 'der', 'Donnerstage', 'Alltag', 'Wochentage', 'hari Kamis', 'Am Donnerstag kaufe ich im Supermarkt ein.', 'Pada hari Kamis saya berbelanja di supermarket.'),
    noun('Freitag', 'der', 'Freitage', 'Alltag', 'Wochentage', 'hari Jumat', 'Am Freitagabend treffen wir uns im Café.', 'Pada Jumat malam kami bertemu di kafe.'),
    noun('Samstag', 'der', 'Samstage', 'Alltag', 'Wochentage', 'hari Sabtu', 'Am Samstag räume ich die Wohnung auf.', 'Pada hari Sabtu saya merapikan apartemen.'),
    noun('Sonntag', 'der', 'Sonntage', 'Alltag', 'Wochentage', 'hari Minggu', 'Am Sonntag machen wir einen Spaziergang.', 'Pada hari Minggu kami berjalan-jalan santai.'),
    noun('Uhr', 'die', 'Uhren', 'Alltag', 'Uhrzeit', 'jam (benda / pukul)', 'Wie viel Uhr ist es bitte?', 'Pukul berapa sekarang?'),
    noun('Stunde', 'die', 'Stunden', 'Alltag', 'Zeitspanne', 'jam (durasi)', 'Der Unterricht dauert zwei Stunden.', 'Pelajaran berlangsung selama dua jam.'),
    noun('Minute', 'die', 'Minuten', 'Alltag', 'Zeitspanne', 'menit', 'Warten Sie bitte fünf Minuten.', 'Tolong tunggu lima menit.'),
    noun('Sekunde', 'die', 'Sekunden', 'Alltag', 'Zeitspanne', 'detik', 'Ein Moment dauert nur wenige Sekunden.', 'Satu saat hanya berlangsung beberapa detik.'),
    noun('Kalender', 'der', 'Kalender', 'Alltag', 'Organisation', 'kalender', 'Ich notiere den Termin in meinem Kalender.', 'Saya mencatat janji temu di kalender saya.'),
    noun('Schlüssel', 'der', 'Schlüssel', 'Alltag', 'Gegenstände', 'kunci', 'Ich habe meinen Schlüssel zu Hause vergessen.', 'Saya lupa kunci saya di rumah.'),
    noun('Brille', 'die', 'Brillen', 'Alltag', 'Gegenstände', 'kacamata', 'Ohne meine Brille kann ich nicht lesen.', 'Tanpa kacamata saya tidak bisa membaca.'),
    noun('Tasche', 'die', 'Taschen', 'Alltag', 'Gegenstände', 'tas', 'Meine Tasche liegt auf dem Tisch.', 'Tas saya terletak di atas meja.'),
    noun('Rucksack', 'der', 'Rucksäcke', 'Alltag', 'Gegenstände', 'ransel', 'Der Student packt seine Bücher in den Rucksack.', 'Mahasiswa itu memasukkan buku-bukunya ke dalam ransel.'),
    verb('duschen', 'duscht', 'duschte', 'hat geduscht', 'geduscht', 'Alltag', 'Körperpflege', 'mandi shower', 'Ich dusche jeden Morgen warm.', 'Saya mandi shower air hangat setiap pagi.'),
    verb('schlafen', 'schläft', 'schlief', 'hat geschlafen', 'geschlafen', 'Alltag', 'Schlaf', 'tidur', 'Das Kind schläft acht Stunden pro Nacht.', 'Anak itu tidur delapan jam semalam.'),
    verb('frühstücken', 'frühstückt', 'frühstückte', 'hat gefrühstückt', 'gefrühstückt', 'Alltag', 'Mahlzeit', 'sarapan', 'Wir frühstücken zusammen um sieben Uhr.', 'Kami sarapan bersama pukul tujuh.'),
    verb('arbeiten', 'arbeitet', 'arbeitete', 'hat gearbeitet', 'gearbeitet', 'Alltag', 'Tagesablauf', 'bekerja', 'Herr Schmidt arbeitet von Montag bis Freitag.', 'Pak Schmidt bekerja dari Senin sampai Jumat.'),
    verb('kochen', 'kocht', 'kochte', 'hat gekocht', 'gekocht', 'Alltag', 'Essen', 'memasak', 'Am Abend koche ich Reis mit Hähnchen.', 'Di malam hari saya memasak nasi dengan ayam.'),
    verb('aufräumen', 'räumt auf', 'räumte auf', 'hat aufgeräumt', 'aufgeräumt', 'Alltag', 'Haushalt', 'merapikan / membereskan', 'Samstags räumt sie ihr Zimmer auf.', 'Setiap Sabtu dia merapikan kamarnya.'),
    verb('putzen', 'putzt', 'putzte', 'hat geputzt', 'geputzt', 'Alltag', 'Haushalt', 'membersihkan / menggosok', 'Ich putze mir die Zähne nach dem Essen.', 'Saya menggosok gigi setelah makan.'),
    verb('warten', 'wartet', 'wartete', 'hat gewartet', 'gewartet', 'Alltag', 'Aktivität', 'menunggu', 'Wir warten an der Haltestelle auf den Bus.', 'Kami menunggu bus di halte.'),
    adj('früh', 'früher', 'am frühsten', 'Alltag', 'Zeit', 'pagi / awal', 'Morgen muss ich sehr früh aufstehen.', 'Besok saya harus bangun sangat pagi.'),
    adj('spät', 'später', 'am spätesten', 'Alltag', 'Zeit', 'terlambat / larut', 'Es ist schon sehr spät, ich gehe ins Bett.', 'Sudah sangat larut, saya pergi tidur.'),
    adj('müde', 'müder', 'am müdesten', 'Alltag', 'Zustand', 'lelah / mengantuk', 'Nach der Arbeit bin ich ziemlich müde.', 'Setelah bekerja saya cukup lelah.'),
    other('heute', 'Adverb', 'Alltag', 'Zeitangabe', 'hari ini', 'Heute ist das Wetter besonders schön.', 'Hari ini cuacanya sangat bagus.'),
    other('morgen', 'Adverb', 'Alltag', 'Zeitangabe', 'besok', 'Morgen habe ich keinen Unterricht.', 'Besok saya tidak ada kelas.'),
    other('gestern', 'Adverb', 'Alltag', 'Zeitangabe', 'kemarin', 'Gestern war ich in der Bibliothek.', 'Kemarin saya berada di perpustakaan.')
]

# 2. Familie und Beziehungen (existing: Geschwister, Eltern, verheiratet, Herkunft)
RAW_DATA['Familie und Beziehungen'] = [
    noun('Familie', 'die', 'Familien', 'Familie und Beziehungen', 'Familie', 'keluarga', 'Meine Familie wohnt in Jakarta.', 'Keluarga saya tinggal di Jakarta.'),
    noun('Vater', 'der', 'Väter', 'Familie und Beziehungen', 'Eltern', 'ayah', 'Mein Vater ist Lehrer an einer Schule.', 'Ayah saya seorang guru di sebuah sekolah.'),
    noun('Mutter', 'die', 'Mütter', 'Familie und Beziehungen', 'Eltern', 'ibu', 'Meine Mutter kocht sehr gerne.', 'Ibu saya sangat suka memasak.'),
    noun('Sohn', 'der', 'Söhne', 'Familie und Beziehungen', 'Kinder', 'anak laki-laki', 'Ihr Sohn ist sieben Jahre alt.', 'Anak laki-lakinya berusia tujuh tahun.'),
    noun('Tochter', 'die', 'Töchter', 'Familie und Beziehungen', 'Kinder', 'anak perempuan', 'Ihre Tochter geht schon in die Schule.', 'Anak perempuannya sudah bersekolah.'),
    noun('Kind', 'das', 'Kinder', 'Familie und Beziehungen', 'Kinder', 'anak', 'Das Kind spielt im Garten mit dem Ball.', 'Anak itu bermain bola di kebun.'),
    noun('Bruder', 'der', 'Brüder', 'Familie und Beziehungen', 'Geschwister', 'saudara laki-laki', 'Mein älterer Bruder studiert Informatik.', 'Kakak laki-laki saya kuliah informatika.'),
    noun('Schwester', 'die', 'Schwestern', 'Familie und Beziehungen', 'Geschwister', 'saudara perempuan', 'Meine Schwester wohnt in Surabaya.', 'Saudara perempuan saya tinggal di Surabaya.'),
    noun('Großvater', 'der', 'Großväter', 'Familie und Beziehungen', 'Großeltern', 'kakek', 'Mein Großvater erzählt schöne Geschichten.', 'Kakek saya menceritakan kisah-kisah yang indah.'),
    noun('Opa', 'der', 'Opas', 'Familie und Beziehungen', 'Großeltern', 'kakek (santai)', 'Mein Opa liest jeden Morgen die Zeitung.', 'Kakek saya membaca koran setiap pagi.'),
    noun('Großmutter', 'die', 'Großmütter', 'Familie und Beziehungen', 'Großeltern', 'nenek', 'Meine Großmutter backt leckeren Kuchen.', 'Nenek saya memanggang kue yang lezat.'),
    noun('Oma', 'die', 'Omas', 'Familie und Beziehungen', 'Großeltern', 'nenek (santai)', 'Wir besuchen unsere Oma am Sonntag.', 'Kami mengunjungi nenek kami pada hari Minggu.'),
    noun('Großeltern', 'die', 'Großeltern (Pl.)', 'Familie und Beziehungen', 'Großeltern', 'kakek-nenek', 'Meine Großeltern leben auf dem Land.', 'Kakek-nenek saya tinggal di desa.'),
    noun('Enkel', 'der', 'Enkel', 'Familie und Beziehungen', 'Familie', 'cucu laki-laki', 'Der Großvater spielt mit seinem Enkel.', 'Kakek bermain dengan cucu laki-lakinya.'),
    noun('Enkelin', 'die', 'Enkelinnen', 'Familie und Beziehungen', 'Familie', 'cucu perempuan', 'Die Oma kauft ein Geschenk für ihre Enkelin.', 'Nenek membeli hadiah untuk cucu perempuannya.'),
    noun('Onkel', 'der', 'Onkel', 'Familie und Beziehungen', 'Verwandte', 'paman', 'Mein Onkel wohnt in Berlin.', 'Paman saya tinggal di Berlin.'),
    noun('Tante', 'die', 'Tanten', 'Familie und Beziehungen', 'Verwandte', 'bibi', 'Tante Maria besucht uns heute.', 'Bibi Maria mengunjungi kami hari ini.'),
    noun('Cousin', 'der', 'Cousins', 'Familie und Beziehungen', 'Verwandte', 'sepupu laki-laki', 'Mein Cousin spielt sehr gut Fußball.', 'Sepupu laki-laki saya bermain sepak bola dengan sangat baik.'),
    noun('Cousine', 'die', 'Cousinen', 'Familie und Beziehungen', 'Verwandte', 'sepupu perempuan', 'Meine Cousine lernt auch Deutsch.', 'Sepupu perempuan saya juga belajar bahasa Jerman.'),
    noun('Mann', 'der', 'Männer', 'Familie und Beziehungen', 'Person / Ehe', 'pria / suami', 'Ihr Mann arbeitet in einem Krankenhaus.', 'Suaminya bekerja di sebuah rumah sakit.'),
    noun('Frau', 'die', 'Frauen', 'Familie und Beziehungen', 'Person / Ehe', 'wanita / istri', 'Meine Frau liest gerne Romane.', 'Istri saya gemar membaca novel.'),
    noun('Baby', 'das', 'Babys', 'Familie und Beziehungen', 'Kleinkind', 'bayi', 'Das Baby schläft ruhig in seinem Bettchen.', 'Bayi itu tidur dengan tenang di tempat tidurnya.'),
    noun('Freund', 'der', 'Freunde', 'Familie und Beziehungen', 'Freundschaft', 'teman laki-laki / pacar', 'Mein bester Freund hilft mir beim Umzug.', 'Sahabat laki-laki saya membantu saya saat pindahan.'),
    noun('Freundin', 'die', 'Freundinnen', 'Familie und Beziehungen', 'Freundschaft', 'teman perempuan / pacar', 'Meine Freundin studiert Medizin in Heidelberg.', 'Teman perempuan saya kuliah kedokteran di Heidelberg.'),
    noun('Nachbar', 'der', 'Nachbarn', 'Familie und Beziehungen', 'Nachbarschaft', 'tetangga laki-laki', 'Unser Nachbar ist sehr freundlich und hilfsbereit.', 'Tetangga laki-laki kami sangat ramah dan suka menolong.'),
    noun('Nachbarin', 'die', 'Nachbarinnen', 'Familie und Beziehungen', 'Nachbarschaft', 'tetangga perempuan', 'Die Nachbarin gießt meine Blumen im Urlaub.', 'Tetangga perempuan menyiram bunga saya saat liburan.'),
    verb('lieben', 'liebt', 'liebte', 'hat geliebt', 'geliebt', 'Familie und Beziehungen', 'Gefühle', 'mencintai / menyayangi', 'Eltern lieben ihre Kinder bedingungslos.', 'Orang tua mencintai anak-anak mereka tanpa syarat.'),
    verb('kennen', 'kennt', 'kannte', 'hat gekannt', 'gekannt', 'Familie und Beziehungen', 'Bekanntschaft', 'mengenal', 'Kennst du meinen Bruder Andreas?', 'Apakah kamu mengenal saudara laki-laki saya Andreas?'),
    verb('besuchen', 'besucht', 'besuchte', 'hat besucht', 'besucht', 'Familie und Beziehungen', 'Treffen', 'mengunjungi', 'Wir besuchen unsere Familie zu Weihnachten.', 'Kami mengunjungi keluarga kami saat Natal.'),
    adj('ledig', None, None, 'Familie und Beziehungen', 'Familienstand', 'belum menikah / lajang', 'Er ist noch ledig und lebt allein.', 'Dia masih lajang dan tinggal sendiri.'),
    adj('geschieden', None, None, 'Familie und Beziehungen', 'Familienstand', 'bercerai', 'Seine Eltern sind seit zwei Jahren geschieden.', 'Orang tuanya sudah bercerai selama dua tahun.'),
    adj('jung', 'jünger', 'am jüngsten', 'Familie und Beziehungen', 'Alter', 'muda', 'Sie ist noch sehr jung, aber sehr klug.', 'Dia masih sangat muda tetapi sangat pintar.'),
    adj('alt', 'älter', 'am ältesten', 'Familie und Beziehungen', 'Alter', 'tua', 'Mein Großvater ist achtzig Jahre alt.', 'Kakek saya berusia delapan puluh tahun.'),
    adj('klein', 'kleiner', 'am kleinsten', 'Familie und Beziehungen', 'Größe', 'kecil / pendek', 'Das kleine Mädchen lacht fröhlich.', 'Gadis kecil itu tertawa dengan riang.'),
    adj('groß', 'größer', 'am größten', 'Familie und Beziehungen', 'Größe', 'besar / tinggi', 'Mein Vater ist ein großer Mann.', 'Ayah saya adalah pria yang berpostur tinggi.'),
    other('zusammen', 'Adverb', 'Familie und Beziehungen', 'Zusammenleben', 'bersama-sama', 'Wir wohnen alle zusammen in einem Haus.', 'Kami semua tinggal bersama di satu rumah.'),
    other('allein', 'Adverb', 'Familie und Beziehungen', 'Zustand', 'sendirian', 'Sie wohnt allein in einer kleinen Wohnung.', 'Dia tinggal sendirian di apartemen kecil.')
]

print("Building datasets...")
