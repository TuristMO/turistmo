INSERT INTO Curator (id,guid, last_modified_date, avatar_url, description, email, first_name, last_name, password, role, verified)
VALUES ('300','225e9bae-186b-4a7e-a34f-e793cc523761','2020-10-12','https://api.adorable.io/avatars/285/abott@adorable.png', 'influencer', 'john@doe.com', 'John', 'Doe', '123456','CURATOR','TRUE'),
       ('444','5a3596b6-aee0-4855-9418-64bddfdd2ecc','2020-10-12','https://api.adorable.io/avatars/285/abott@adorable.png', 'influencer', 'johanna@doe.com', 'Johanna', 'Doe', '123456','CURATOR','TRUE'),
       ('123','2ac5fa5b-6204-46fd-9cd5-5d02134f7703','2020-10-12','https://api.adorable.io/avatars/285/abott@adorable.png', 'Youtuber', 'Joel@doe.com', 'Joel', 'Doe', '123456','CURATOR','TRUE'),
       ('321','850724ba-1ef3-4db1-a497-a6293cefa5b5','2020-10-12','https://api.adorable.io/avatars/285/abott@adorable.png', 'Model', 'Joy@doe.com', 'Joy', 'Doe', '123456','CURATOR','TRUE'),
       ('187','513c6096-0199-43f6-9aa7-ac97782e4e5e','2020-10-12','https://api.adorable.io/avatars/285/abott@adorable.png', 'E-sport', 'Jesper@doe.com', 'Jesper', 'Doe', '123456','CURATOR','TRUE'),
       ('111','513c6096-0200-43f3-9aa7-ff97782e4a90','2020-10-12','https://api.adorable.io/avatars/285/abott@adorable.png', 'Sports', 'Jenna@doe.com', 'Jenna', 'Doe', '123456','CURATOR','TRUE');


INSERT INTO Application (id, created_date, guid, last_modified_date, android_link, ios_link, title, logo)
VALUES ('100','2020-10-12','27cce737-4a7a-4544-8f8b-9a02b680290a','2020-10-12','https://play.google.com/store/apps/details?id=com.sl.SLBiljetter&hl=sv', 'empty-for-now', 'SL', 'https://is5-ssl.mzstatic.com/image/thumb/Purple114/v4/30/00/03/3000030b-6b4c-8e24-1ba9-1a541ae31b1c/AppIcon-NewUI-0-0-1x_U007emarketing-0-0-0-5-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/350x350.png'),
       ('55','2020-10-12','280e6220-9efb-4226-9670-652187347609','2020-10-12','https://play.google.com/store/apps/details?id=com.nobina.resistockholm.resistockholm', 'empty-for-now', 'Res i Stockholm', 'https://lh3.googleusercontent.com/8bEW-rvEPMrJqTAOPYlaI0GdZQSYXFe9DrU_S_N2mdJzeX6TG02elgZ4MF_Gh7CGFvQ=s180-rw'),
       ('89','2020-10-12','abc1c2a3-b027-4d03-8110-1a4ac2471931', '2020-10-12','https://play.google.com/store/apps/details?id=se.mobilestorytelling.higab&hl=en', 'empty-for-now', 'mobile storytelling', 'https://lh3.googleusercontent.com/WoBeYKgQ1CzlGPhNCM593u-ADxVk83y_3RNEOFhzIgGlzEBp8SPvrJ3yvuWdzrLC3dk=s180-rw'),
       ('23','2020-10-12','865b6103-7b08-4525-8411-6c225af1d743','2020-10-12','https://play.google.com/store/apps/details?id=appinventor.ai_viktor_ohlsson.Radiomuseet', 'empty-for-now', 'Radiomuseet', 'https://lh3.googleusercontent.com/jiVkiuhFHRTNKMi-KfWPvyAq_Re7vSpqwoYJ_PbLQZjIWcdb4_KxuNwJX9HcUX_EXEY=s128-rw'),
       ('10','2020-10-12','86ff6103-66aa-4225-8400-6c225af1daaa','2020-10-12','https://play.google.com/store/apps/details?id=com.smartbikeapp.malmo', 'empty-for-now', 'Malmö by bike', 'https://lh3.googleusercontent.com/Tf65S_IEGpOclAFLt_2Ff5Q-VVMXOe9p1dauiDwHJdA-qIUk0xZzgujGQQ_YPU5Z2bla=s180'),
       ('12','2020-10-12','86ff6103-66aa-4225-8400-6c225af1daaa','2020-10-12','https://play.google.com/store/apps/details?id=com.vaesttrafik.vaesttrafik', 'empty-for-now', 'Västtrafik To Go', 'https://lh3.googleusercontent.com/FfmXWRpCy-zQ3ByK29_C4rVtNO9WJMs3dCb04DHtSS7mRVIkgDADUjEOnUVOtgearJ8=s180'),
       ('77','2020-10-12','865b6100-7b08-4525-7000-6c225a991480','2020-10-12','https://play.google.com/store/apps/details?id=se.laventura.naturkartan.uppsala', 'empty-for-now', 'Uppsalas läns Naturkarta', 'https://lh3.googleusercontent.com/AjB1Yqb4WA748xcmtHWsYVFWZuluPTvVrz9WVwSc_xDKwpj-YNqke0ZNSsqULjaqMVoA=s180');


INSERT INTO Tag (id,created_date,guid,last_modified_date, title)
VALUES ('1','2020-10-12','fa1b49eb-39c4-47fd-9733-4ea76244c718','2020-10-12','Stockholm'),
       ('2','2020-10-12','de616051-acf4-4b7d-9e30-eb0a56a75cec','2020-10-12','Food'),
       ('8','2020-10-12','7fee025f-0afe-403a-8a97-8a43172b7ac0','2020-10-12','Culture'),
       ('9','2020-10-12','d3c95b13-bceb-46f3-9f8b-20a1a6c86c63','2020-10-12','Göteborg'),
       ('10','2020-10-12','983c58da-1284-47f2-a557-360b8bcbd05c','2020-10-12','Travel'),
       ('12','2020-10-12','983c58da-1284-a6dd-a557-360b8efef066','2020-10-12','Nature'),
       ('17','2020-10-12','983c58da-1284-4755-a557-360b8efeffff','2020-10-12','Outdoors'),
       ('13','2020-10-12','983c58da-1284-47a3-a557-360b8aaaa444','2020-10-12','Adventure');


INSERT INTO Package (id,created_date ,guid,last_modified_date ,title,curator_id ,city,description)
VALUES ('234','2020-10-12','da6ff7ab-3fa2-4b7d-ad8f-2a7d41b1d677','2020-10-12','Travelling around Stockholm','300','Stockholm'
        ,'I det här paketet hittar du nödvändiga appar för att åka runt i Stockholm'),
       ('544','2020-10-12','da6ff7ab-3fa2-4b7d-ad8f-2a7d41b30000','2020-10-12','Dining in Stockholm','300','Stockholm'
        ,'Här hittar du matnyttiga appar för äta gott i Stockholm'),
        ('567','2020-10-12','75170fbd-0078-49c8-81e2-b00323156653','2020-10-12','Göteborg culture','187','Göteborg'
        ,'Om du vill få ut det bästa av Göteborgs kulturutbud, så är dessa appar något för dig!'),
        ('632','2020-10-12','75170fbd-0078-49c8-81e2-c99923100099','2020-10-12','Travelling around Göteborg','187','Göteborg'
        ,'I det här paketet finner du appar för att åka runt i Göteborg'),
        ('100','2020-10-12','75170fbd-0078-49f8-91e2-c99923156700','2020-10-12','Find adventure in Malmö','111','Malmö'
        ,'Äventyra runt Malmö med dessa appar'),
        ('999','2020-10-12','75170fbd-00c5-49f8-91e2-c999231ef994','2020-10-12','Onödigt många appar här','444','Kiruna'
        ,'Appar hela vägen till höger under app-flatlist i detta paket'),
        ('32','2020-10-12','75170fbd-0078-49a8-92e2-c99923156000','2020-10-12','The great ourdoors in Uppsala','111','Uppsala'
        ,'Bästa apparna för naturupplevelse runt Uppsala');


INSERT INTO package_application(package_id,application_id)
VALUES  (234,100),
        (544,100),
        (544,55),
        (567,89),
        (567,23),
        (32,77),
        (100,10),
        (632,12),
        (999,100),
        (999,55),
        (999,89),
        (999,23),
        (999,77),
        (999,10),
        (999,12);


INSERT INTO package_tag (tag_id, package_id)
VALUES  (1,234), /* Stockholm */
        (10,234), /* Travel */
        (1,544),  /* Stockholm */
        (2,544), /* Food */
        (10,544), /* Travel */
        (9,567), /* Göteborg */
        (8,567), /* Culture */
        (10,632), /* Travel */
        (9,632), /* Göteborg */
        (12,100), /* Adventure */
        (12,32), /* Nature */
        (17,32), /* Outoors */
        (1,999), /* Food */
        (2,999), /* Culture */
        (10,999), /* Travel */
        (12,999), /* Nature */
        (17,999), /* Outdoors */
        (13,999); /* Adventure */