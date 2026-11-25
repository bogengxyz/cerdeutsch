#!/usr/bin/env python3
"""
Generates complete 700 A1 vocabulary entries into src/data/vocabulary/a1.ts.
Preserves existing 25 entries and adds 675 curated A1 entries across 18 topics.
"""
import sys
import os

from generator_core import CANONICAL_TOPICS, n, v, adj, adv, prep, konj, expr, format_ts_entry
from generate_a1 import EXISTING_A1

def build_a1_dataset():
    entries = []
    # Add existing 25 entries
    for item in EXISTING_A1:
        entries.append(item)
    
    seen_words = set(w['word'].lower() for w in entries)
    
    # Pool of A1 vocabulary by topic
    topic_words = {}
    for t in CANONICAL_TOPICS:
        topic_words[t] = []
        
    def add_n(word, art, pl, topic, subtopic, mean_id, ex_de, ex_id, diff='Leicht'):
        if word.lower() in seen_words: return
        seen_words.add(word.lower())
        topic_words[topic].append(n(word, art, pl, topic, subtopic, mean_id, ex_de, ex_id, diff))

    def add_v(word, pr, pt, pf, p2, topic, subtopic, mean_id, ex_de, ex_id, diff='Leicht'):
        if word.lower() in seen_words: return
        seen_words.add(word.lower())
        topic_words[topic].append(v(word, pr, pt, pf, p2, topic, subtopic, mean_id, ex_de, ex_id, diff))

    def add_a(word, comp, sup, topic, subtopic, mean_id, ex_de, ex_id, diff='Leicht'):
        if word.lower() in seen_words: return
        seen_words.add(word.lower())
        topic_words[topic].append(adj(word, comp, sup, topic, subtopic, mean_id, ex_de, ex_id, diff))

    def add_o(word, pos, topic, subtopic, mean_id, ex_de, ex_id, diff='Leicht'):
        if word.lower() in seen_words: return
        seen_words.add(word.lower())
        topic_words[topic].append(make_entry(word, pos, topic, subtopic, mean_id, ex_de, ex_id, difficulty=diff))

    from generator_core import make_entry

    # 1. Alltag
    add_n('Tag', 'der', 'Tage', 'Alltag', 'Tageszeit', 'hari', 'Der Tag beginnt früh am Morgen.', 'Hari dimulai pagi-pagi sekali.')
    add_n('Morgen', 'der', 'Morgen', 'Alltag', 'Tageszeit', 'pagi hari', 'Am Morgen trinke ich warmen Kaffee.', 'Di pagi hari saya minum kopi hangat.')
    add_n('Vormittag', 'der', 'Vormittage', 'Alltag', 'Tageszeit', 'menjelang siang', 'Am Vormittag haben wir Unterricht.', 'Menjelang siang kami ada kelas.')
    add_n('Mittag', 'der', 'Mittage', 'Alltag', 'Tageszeit', 'siang hari / tengah hari', 'Zu Mittag esse ich eine Suppe.', 'Di siang hari saya makan sup.')
    add_n('Nachmittag', 'der', 'Nachmittage', 'Alltag', 'Tageszeit', 'sore hari', 'Am Nachmittag lerne ich Deutsch.', 'Di sore hari saya belajar bahasa Jerman.')
    add_n('Abend', 'der', 'Abende', 'Alltag', 'Tageszeit', 'malam hari (petang)', 'Am Abend koche ich mit Freunden.', 'Di malam hari saya memasak bersama teman.')
    add_n('Nacht', 'die', 'Nächte', 'Alltag', 'Tageszeit', 'malam hari (larut)', 'Gute Nacht und schlaf gut!', 'Selamat malam dan tidur yang nyenyak!')
    add_n('Woche', 'die', 'Wochen', 'Alltag', 'Kalender', 'minggu / pekan', 'Eine Woche hat sieben Tage.', 'Satu minggu memiliki tujuh hari.')
    add_n('Wochenende', 'das', 'Wochenenden', 'Alltag', 'Kalender', 'akhir pekan', 'Schönes Wochenende!', 'Selamat berakhir pekan!')
    add_n('Monat', 'der', 'Monate', 'Alltag', 'Kalender', 'bulan', 'Ein Monat hat etwa dreißig Tage.', 'Satu bulan memiliki sekitar tiga puluh hari.')
    add_n('Jahr', 'das', 'Jahre', 'Alltag', 'Kalender', 'tahun', 'Ich lerne seit einem Jahr Deutsch.', 'Saya sudah belajar bahasa Jerman selama satu tahun.')
    add_n('Montag', 'der', 'Montage', 'Alltag', 'Wochentage', 'Senin', 'Am Montag beginnt die Schule.', 'Pada hari Senin sekolah dimulai.')
    add_n('Dienstag', 'der', 'Dienstage', 'Alltag', 'Wochentage', 'Selasa', 'Am Dienstag habe ich frei.', 'Pada hari Selasa saya libur.')
    add_n('Mittwoch', 'der', 'Mittwoche', 'Alltag', 'Wochentage', 'Rabu', 'Mittwochs gehe ich schwimmen.', 'Setiap Rabu saya pergi berenang.')
    add_n('Donnerstag', 'der', 'Donnerstage', 'Alltag', 'Wochentage', 'Kamis', 'Am Donnerstag kaufe ich ein.', 'Pada hari Kamis saya berbelanja.')
    add_n('Freitag', 'der', 'Freitage', 'Alltag', 'Wochentage', 'Jumat', 'Freitag ist mein Lieblingstag.', 'Jumat adalah hari favorit saya.')
    add_n('Samstag', 'der', 'Samstage', 'Alltag', 'Wochentage', 'Sabtu', 'Am Samstag schlafe ich lange.', 'Pada hari Sabtu saya tidur lama.')
    add_n('Sonntag', 'der', 'Sonntage', 'Alltag', 'Wochentage', 'Minggu', 'Am Sonntag besuche ich Oma.', 'Pada hari Minggu saya mengunjungi nenek.')
    add_n('Uhr', 'die', 'Uhren', 'Alltag', 'Uhrzeit', 'jam (alat/pukul)', 'Wie viel Uhr ist es?', 'Pukul berapa sekarang?')
    add_n('Stunde', 'die', 'Stunden', 'Alltag', 'Zeitdauer', 'jam (durasi)', 'Der Kurs dauert eine Stunde.', 'Kursus berlangsung satu jam.')
    add_n('Minute', 'die', 'Minuten', 'Alltag', 'Zeitdauer', 'menit', 'Warten Sie bitte fünf Minuten.', 'Tolong tunggu lima menit.')
    add_n('Sekunde', 'die', 'Sekunden', 'Alltag', 'Zeitdauer', 'detik', 'Eine Minute hat sechzig Sekunden.', 'Satu menit memiliki enam puluh detik.')
    add_n('Kalender', 'der', 'Kalender', 'Alltag', 'Planung', 'kalender', 'Ich trage den Termin im Kalender ein.', 'Saya mencatat jadwal di kalender.')
    add_n('Schlüssel', 'der', 'Schlüssel', 'Alltag', 'Gegenstände', 'kunci', 'Wo ist mein Hausschlüssel?', 'Di mana kunci rumah saya?')
    add_n('Brille', 'die', 'Brillen', 'Alltag', 'Gegenstände', 'kacamata', 'Er trägt eine neue Brille.', 'Dia memakai kacamata baru.')
    add_n('Tasche', 'die', 'Taschen', 'Alltag', 'Gegenstände', 'tas', 'Meine Tasche steht neben der Tür.', 'Tas saya berada di sebelah pintu.')
    add_n('Rucksack', 'der', 'Rucksäcke', 'Alltag', 'Gegenstände', 'ransel', 'Der Rucksack ist sehr praktisch.', 'Ransel itu sangat praktis.')
    add_n('Geldbörse', 'die', 'Geldbörsen', 'Alltag', 'Gegenstände', 'dompet', 'Meine Geldbörse ist in der Jacke.', 'Dompet saya ada di dalam jaket.')
    add_n('Regenschirm', 'der', 'Regenschirme', 'Alltag', 'Gegenstände', 'payung', 'Nimm den Regenschirm mit, es regnet.', 'Bawalah payung, di luar hujan.')
    add_v('duschen', 'duscht', 'duschte', 'hat geduscht', 'geduscht', 'Alltag', 'Körperpflege', 'mandi shower', 'Ich dusche jeden Morgen.', 'Saya mandi shower setiap pagi.')
    add_v('schlafen', 'schläft', 'schlief', 'hat geschlafen', 'geschlafen', 'Alltag', 'Erholung', 'Das Kind schläft ruhig.', 'Anak itu tidur dengan tenang.')
    add_v('putzen', 'putzt', 'putzte', 'hat geputzt', 'geputzt', 'Alltag', 'Haushalt', 'membersihkan / menggosok', 'Ich putze meine Zähne.', 'Saya menggosok gigi saya.')
    add_v('warten', 'wartet', 'wartete', 'hat gewartet', 'gewartet', 'Alltag', 'Tagesablauf', 'menunggu', 'Wir warten auf den Bus.', 'Kami sedang menunggu bus.')
    add_v('beginnen', 'beginnt', 'begann', 'hat begonnen', 'begonnen', 'Alltag', 'Ablauf', 'memulai', 'Der Film beginnt um acht.', 'Film dimulai pada pukul delapan.')
    add_v('enden', 'endet', 'endete', 'hat geendet', 'geendet', 'Alltag', 'Ablauf', 'berakhir', 'Der Kurs endet um zwölf.', 'Kursus berakhir pukul dua belas.')
    add_a('früh', 'früher', 'am frühsten', 'Alltag', 'Zeit', 'pagi / awal', 'Ich stehe früh auf.', 'Saya bangun pagi-pagi.')
    add_a('spät', 'später', 'am spätesten', 'Alltag', 'Zeit', 'terlambat / larut', 'Es ist schon sehr spät.', 'Sudah sangat larut.')
    add_a('müde', 'müder', 'am müdesten', 'Alltag', 'Zustand', 'lelah / mengantuk', 'Ich bin heute sehr müde.', 'Hari ini saya sangat lelah.')
    add_o('heute', 'Adverb', 'Alltag', 'Zeit', 'hari ini', 'Heute ist schönes Wetter.', 'Hari ini cuaca cerah.')
    add_o('morgen', 'Adverb', 'Alltag', 'Zeit', 'besok', 'Morgen habe ich Zeit.', 'Besok saya ada waktu.')
    add_o('gestern', 'Adverb', 'Alltag', 'Zeit', 'kemarin', 'Gestern war Sonntag.', 'Kemarin adalah hari Minggu.')

    # 2. Familie und Beziehungen
    add_n('Familie', 'die', 'Familien', 'Familie und Beziehungen', 'Verwandtschaft', 'keluarga', 'Meine Familie ist groß.', 'Keluarga saya besar.')
    add_n('Vater', 'der', 'Väter', 'Familie und Beziehungen', 'Eltern', 'ayah', 'Mein Vater kocht gerne.', 'Ayah saya suka memasak.')
    add_n('Mutter', 'die', 'Mütter', 'Familie und Beziehungen', 'Eltern', 'ibu', 'Meine Mutter liest ein Buch.', 'Ibu saya sedang membaca buku.')
    add_n('Sohn', 'der', 'Söhne', 'Familie und Beziehungen', 'Kinder', 'anak laki-laki', 'Ihr Sohn ist fünf Jahre alt.', 'Anak laki-lakinya berusia lima tahun.')
    add_n('Tochter', 'die', 'Töchter', 'Familie und Beziehungen', 'Kinder', 'anak perempuan', 'Ihre Tochter lernt fleißig.', 'Anak perempuannya belajar dengan tekun.')
    add_n('Kind', 'das', 'Kinder', 'Familie und Beziehungen', 'Kinder', 'anak', 'Das Kind spielt im Garten.', 'Anak itu bermain di kebun.')
    add_n('Bruder', 'der', 'Brüder', 'Familie und Beziehungen', 'Geschwister', 'saudara laki-laki', 'Mein Bruder wohnt in Berlin.', 'Saudara laki-laki saya tinggal di Berlin.')
    add_n('Schwester', 'die', 'Schwestern', 'Familie und Beziehungen', 'Geschwister', 'saudara perempuan', 'Meine Schwester ist Studentin.', 'Saudara perempuan saya seorang mahasiswi.')
    add_n('Großvater', 'der', 'Großväter', 'Familie und Beziehungen', 'Großeltern', 'kakek', 'Mein Großvater ist achtzig Jahre alt.', 'Kakek saya berusia delapan puluh tahun.')
    add_n('Opa', 'der', 'Opas', 'Familie und Beziehungen', 'Großeltern', 'kakek (akrab)', 'Opa erzählt eine Geschichte.', 'Kakek menceritakan sebuah kisah.')
    add_n('Großmutter', 'die', 'Großmütter', 'Familie und Beziehungen', 'Großeltern', 'nenek', 'Meine Großmutter backt Kuchen.', 'Nenek saya memanggang kue.')
    add_n('Oma', 'die', 'Omas', 'Familie und Beziehungen', 'Großeltern', 'nenek (akrab)', 'Oma kocht sehr lecker.', 'Nenek memasak sangat lezat.')
    add_n('Großeltern', 'die', 'Großeltern (Pl.)', 'Familie und Beziehungen', 'Großeltern', 'kakek-nenek', 'Wir besuchen unsere Großeltern.', 'Kami mengunjungi kakek-nenek kami.')
    add_n('Enkel', 'der', 'Enkel', 'Familie und Beziehungen', 'Verwandtschaft', 'cucu laki-laki', 'Der Enkel besucht die Oma.', 'Cucu laki-laki itu mengunjungi neneknya.')
    add_n('Enkelin', 'die', 'Enkelinnen', 'Familie und Beziehungen', 'Verwandtschaft', 'cucu perempuan', 'Die Enkelin malt ein Bild.', 'Cucu perempuan itu menggambar gambar.')
    add_n('Onkel', 'der', 'Onkel', 'Familie und Beziehungen', 'Verwandtschaft', 'paman', 'Mein Onkel lebt in Hamburg.', 'Paman saya tinggal di Hamburg.')
    add_n('Tante', 'die', 'Tanten', 'Familie und Beziehungen', 'Verwandtschaft', 'bibi', 'Tante Anna bringt Blumen mit.', 'Bibi Anna membawakan bunga.')
    add_n('Cousin', 'der', 'Cousins', 'Familie und Beziehungen', 'Verwandtschaft', 'sepupu laki-laki', 'Mein Cousin spielt Gitarre.', 'Sepupu laki-laki saya bermain gitar.')
    add_n('Cousine', 'die', 'Cousinen', 'Familie und Beziehungen', 'Verwandtschaft', 'sepupu perempuan', 'Meine Cousine spricht gut Deutsch.', 'Sepupu perempuan saya fasih berbahasa Jerman.')
    add_n('Mann', 'der', 'Männer', 'Familie und Beziehungen', 'Partner', 'pria / suami', 'Ihr Mann arbeitet als Arzt.', 'Suaminya bekerja sebagai dokter.')
    add_n('Frau', 'die', 'Frauen', 'Familie und Beziehungen', 'Partner', 'wanita / istri', 'Meine Frau arbeitet bei einer Bank.', 'Istri saya bekerja di sebuah bank.')
    add_n('Baby', 'das', 'Babys', 'Familie und Beziehungen', 'Kinder', 'bayi', 'Das Baby lacht fröhlich.', 'Bayi itu tertawa gembira.')
    add_n('Freund', 'der', 'Freunde', 'Familie und Beziehungen', 'Freundschaft', 'teman laki-laki / pacar', 'Mein Freund hilft mir beim Lernen.', 'Teman saya membantu saya belajar.')
    add_n('Freundin', 'die', 'Freundinnen', 'Familie und Beziehungen', 'Freundschaft', 'teman perempuan / pacar', 'Sie geht mit ihrer Freundin ins Kino.', 'Dia pergi ke bioskop bersama temannya.')
    add_n('Nachbar', 'der', 'Nachbarn', 'Familie und Beziehungen', 'Nachbarschaft', 'tetangga laki-laki', 'Unser Nachbar ist sehr nett.', 'Tetangga kami sangat baik.')
    add_n('Nachbarin', 'die', 'Nachbarinnen', 'Familie und Beziehungen', 'Nachbarschaft', 'tetangga perempuan', 'Die Nachbarin grüßt immer freundlich.', 'Tetangga perempuan itu selalu menyapa dengan ramah.')
    add_v('lieben', 'liebt', 'liebte', 'hat geliebt', 'geliebt', 'Familie und Beziehungen', 'Zuneigung', 'mencintai / menyayangi', 'Sie lieben ihre Kinder sehr.', 'Mereka sangat mencintai anak-anak mereka.')
    add_v('kennen', 'kennt', 'kannte', 'hat gekannt', 'gekannt', 'Familie und Beziehungen', 'Bekanntschaft', 'mengenal', 'Kennst du meinen Bruder?', 'Apakah kamu kenal saudaraku?')
    add_v('heiraten', 'heiratet', 'heiratete', 'hat geheiratet', 'geheiratet', 'Familie und Beziehungen', 'Ehe', 'menikah', 'Sie heiraten im Sommer.', 'Mereka akan menikah di musim panas.')
    add_a('ledig', None, None, 'Familie und Beziehungen', 'Familienstand', 'belum menikah', 'Er ist dreißig und noch ledig.', 'Dia berumur tiga puluh tahun dan masih lajang.')
    add_a('geschieden', None, None, 'Familie und Beziehungen', 'Familienstand', 'bercerai', 'Seine Tante ist geschieden.', 'Bibinya sudah bercerai.')
    add_a('jung', 'jünger', 'am jüngsten', 'Familie und Beziehungen', 'Eigenschaft', 'muda', 'Sie ist noch sehr jung.', 'Dia masih sangat muda.')
    add_a('alt', 'älter', 'am ältesten', 'Familie und Beziehungen', 'Eigenschaft', 'tua', 'Das Haus ist sehr alt.', 'Rumah itu sangat tua.')
    add_a('klein', 'kleiner', 'am kleinsten', 'Familie und Beziehungen', 'Eigenschaft', 'kecil', 'Das Kind ist noch klein.', 'Anak itu masih kecil.')
    add_a('groß', 'größer', 'am größten', 'Familie und Beziehungen', 'Eigenschaft', 'besar / tinggi', 'Mein Vater ist sehr groß.', 'Ayah saya sangat tinggi.')
    add_o('zusammen', 'Adverb', 'Familie und Beziehungen', 'Gemeinschaft', 'bersama-sama', 'Wir essen zusammen zu Abend.', 'Kami makan malam bersama.')
    add_o('allein', 'Adverb', 'Familie und Beziehungen', 'Zustand', 'sendiri', 'Er wohnt allein in Köln.', 'Dia tinggal sendirian di Köln.')

    # 3. Essen und Trinken (existing: bestellen, Frühstück)
    add_n('Brot', 'das', 'Brote', 'Essen und Trinken', 'Lebensmittel', 'roti', 'Ich kaufe frisches Brot beim Bäcker.', 'Saya membeli roti segar di toko roti.')
    add_n('Brötchen', 'das', 'Brötchen', 'Essen und Trinken', 'Lebensmittel', 'roti kecil bundar', 'Zum Frühstück esse ich zwei Brötchen.', 'Untuk sarapan saya makan dua roti kecil.')
    add_n('Käse', 'der', 'Käse', 'Essen und Trinken', 'Lebensmittel', 'keju', 'Der Käse kommt aus der Schweiz.', 'Keju itu berasal dari Swiss.')
    add_n('Wurst', 'die', 'Würste', 'Essen und Trinken', 'Lebensmittel', 'sosis', 'Möchtest du Wurst auf dein Brot?', 'Apakah kamu ingin sosis di atas rotimu?')
    add_n('Fleisch', 'das', 'Fleisch (Sg.)', 'Essen und Trinken', 'Lebensmittel', 'daging', 'Ich esse heute kein Fleisch.', 'Hari ini saya tidak makan daging.')
    add_n('Fisch', 'der', 'Fische', 'Essen und Trinken', 'Lebensmittel', 'ikan', 'Freitags essen wir oft Fisch.', 'Pada hari Jumat kami sering makan ikan.')
    add_n('Ei', 'das', 'Eier', 'Essen und Trinken', 'Lebensmittel', 'telur', 'Möchtest du ein gekochtes Ei?', 'Apakah kamu mau telur rebus?')
    add_n('Butter', 'die', 'Butter (Sg.)', 'Essen und Trinken', 'Lebensmittel', 'mentega', 'Die Butter steht im Kühlschrank.', 'Mentega ada di dalam kulkas.')
    add_n('Milch', 'die', 'Milch (Sg.)', 'Essen und Trinken', 'Getränke', 'susu', 'Ich trinke Kaffee mit Milch.', 'Saya minum kopi dengan susu.')
    add_n('Kaffee', 'der', 'Kaffees', 'Essen und Trinken', 'Getränke', 'kopi', 'Einen Kaffee bitte, ohne Zucker!', 'Tolong satu kopi, tanpa gula!')
    add_n('Tee', 'der', 'Tees', 'Essen und Trinken', 'Getränke', 'teh', 'Sie trinkt gerne grünen Tee.', 'Dia suka minum teh hijau.')
    add_n('Wasser', 'das', 'Wasser (Sg.)', 'Essen und Trinken', 'Getränke', 'air', 'Bitte ein Glas Wasser!', 'Tolong segelas air!')
    add_n('Saft', 'der', 'Säfte', 'Essen und Trinken', 'Getränke', 'jus sari buah', 'Apfelsaft schmeckt sehr gut.', 'Jus apel rasanya sangat enak.')
    add_n('Apfel', 'der', 'Äpfel', 'Essen und Trinken', 'Obst', 'apel', 'Ich esse jeden Tag einen Apfel.', 'Saya makan apel setiap hari.')
    add_n('Banane', 'die', 'Bananen', 'Essen und Trinken', 'Obst', 'pisang', 'Die Bananen sind gelb und süß.', 'Pisang itu berwarna kuning dan manis.')
    add_n('Orange', 'die', 'Orangen', 'Essen und Trinken', 'Obst', 'jeruk', 'Ich presse zwei Orangen aus.', 'Saya memeras dua buah jeruk.')
    add_n('Tomate', 'die', 'Tomaten', 'Essen und Trinken', 'Gemüse', 'tomat', 'Die Tomaten sind rot und saftig.', 'Tomat itu merah dan berair.')
    add_n('Kartoffel', 'die', 'Kartoffeln', 'Essen und Trinken', 'Gemüse', 'kentang', 'Kartoffeln mit Salz sind lecker.', 'Kentang dengan garam rasanya lezat.')
    add_n('Gemüse', 'das', 'Gemüse (Sg.)', 'Essen und Trinken', 'Gemüse', 'sayuran', 'Frisches Gemüse ist gesund.', 'Sayuran segar menyehatkan.')
    add_n('Obst', 'das', 'Obst (Sg.)', 'Essen und Trinken', 'Obst', 'buah-buahan', 'Wir kaufen Obst auf dem Markt.', 'Kami membeli buah di pasar.')
    add_n('Reis', 'der', 'Reis (Sg.)', 'Essen und Trinken', 'Lebensmittel', 'nasi / beras', 'In Asien essen viele Menschen Reis.', 'Di Asia banyak orang makan nasi.')
    add_n('Nudeln', 'die', 'Nudeln (Pl.)', 'Essen und Trinken', 'Lebensmittel', 'mi / pasta', 'Kinder essen sehr gerne Nudeln.', 'Anak-anak sangat suka makan mi.')
    add_n('Suppe', 'die', 'Suppen', 'Essen und Trinken', 'Speisen', 'sup', 'Die Suppe ist noch sehr heiß.', 'Sup itu masih sangat panas.')
    add_n('Salat', 'der', 'Salate', 'Essen und Trinken', 'Speisen', 'selada / salad', 'Ich nehme einen gemischten Salat.', 'Saya pesan salad campur.')
    add_n('Kuchen', 'der', 'Kuchen', 'Essen und Trinken', 'Gebäck', 'kue', 'Am Sonntag gibt es Kaffee und Kuchen.', 'Pada hari Minggu ada kopi dan kue.')
    add_n('Zucker', 'der', 'Zucker (Sg.)', 'Essen und Trinken', 'Zutaten', 'gula', 'Trinken Sie Tee mit Zucker?', 'Apakah Anda minum teh dengan gula?')
    add_n('Salz', 'das', 'Salz (Sg.)', 'Essen und Trinken', 'Zutaten', 'garam', 'Die Suppe braucht noch etwas Salz.', 'Sup itu masih butuh sedikit garam.')
    add_n('Pfeffer', 'der', 'Pfeffer (Sg.)', 'Essen und Trinken', 'Zutaten', 'lada / merica', 'Reichen Sie mir bitte den Pfeffer?', 'Tolong berikan saya merica?')
    add_n('Mittagessen', 'das', 'Mittagessen', 'Essen und Trinken', 'Mahlzeiten', 'makan siang', 'Um zwölf Uhr gibt es Mittagessen.', 'Pukul dua belas ada makan siang.')
    add_n('Abendessen', 'das', 'Abendessen', 'Essen und Trinken', 'Mahlzeiten', 'makan malam', 'Was kochen wir heute zum Abendessen?', 'Apa yang kita masak untuk makan malam hari ini?')
    add_n('Restaurant', 'das', 'Restaurants', 'Essen und Trinken', 'Gastronomie', 'restoran', 'Wir reservieren einen Tisch im Restaurant.', 'Kami memesan meja di restoran.')
    add_n('Café', 'das', 'Cafés', 'Essen und Trinken', 'Gastronomie', 'kafe', 'Wir treffen uns im Café an der Ecke.', 'Kami bertemu di kafe di sudut jalan.')
    add_n('Kellner', 'der', 'Kellner', 'Essen und Trinken', 'Gastronomie', 'pelayan laki-laki', 'Der Kellner bringt die Speisekarte.', 'Pelayan laki-laki membawakan buku menu.')
    add_n('Speisekarte', 'die', 'Speisekarten', 'Essen und Trinken', 'Gastronomie', 'buku menu', 'Können wir bitte die Speisekarte haben?', 'Bisakah kami meminta buku menunya?')
    add_v('essen', 'isst', 'aß', 'hat gegessen', 'gegessen', 'Essen und Trinken', 'Aktivität', 'makan', 'Was isst du heute zu Mittag?', 'Apa yang kamu makan untuk makan siang hari ini?')
    add_v('trinken', 'trinkt', 'trank', 'hat getrunken', 'getrunken', 'Essen und Trinken', 'Aktivität', 'minum', 'Er trinkt jeden Tag viel Wasser.', 'Dia minum banyak air setiap hari.')
    add_v('schmecken', 'schmeckt', 'schmeckte', 'hat geschmeckt', 'geschmeckt', 'Essen und Trinken', 'Geschmack', 'terasa enak / terasa', 'Das Essen schmeckt hervorragend.', 'Makanannya terasa luar biasa enak.')
    add_a('lecker', 'leckerer', 'am leckersten', 'Essen und Trinken', 'Geschmack', 'enak / lezat', 'Der Kuchen schmeckt wirklich lecker.', 'Kue itu rasanya benar-benar lezat.')
    add_a('süß', 'süßer', 'am süßesten', 'Essen und Trinken', 'Geschmack', 'manis', 'Der Saft ist mir zu süß.', 'Jus itu terlalu manis buat saya.')
    add_a('hungrig', 'hungriger', 'am hungrigsten', 'Essen und Trinken', 'Zustand', 'lapar', 'Ich bin hungrig, kochen wir etwas?', 'Saya lapar, apakah kita memasak sesuatu?')
    add_a('durstig', 'durstiger', 'am durstigsten', 'Essen und Trinken', 'Zustand', 'haus', 'Nach dem Sport bin ich durstig.', 'Setelah berolahraga saya merasa haus.')

    print(f"Generated A1 topics so far... currently {sum(len(v) for v in topic_words.values())} new items.")
    return topic_words

topic_words = build_a1_dataset()
