INSERT INTO Curator (id,guid, last_modified_date, avatar_url, description, email, first_name, last_name, password, role, verified)
VALUES ('300','225e9bae-186b-4a7e-a34f-e793cc523761','2020-10-12','https://api.adorable.io/avatars/285/abott@adorable.png', 'influencer', 'john@doe.com', 'John', 'Doe', '123456','CURATOR','TRUE'),
       ('444','5a3596b6-aee0-4855-9418-64bddfdd2ecc','2020-10-12','https://api.adorable.io/avatars/285/abott@adorable.png', 'influencer', 'johanna@doe.com', 'Johanna', 'Doe', '123456','CURATOR','TRUE'),
       ('123','2ac5fa5b-6204-46fd-9cd5-5d02134f7703','2020-10-12','https://api.adorable.io/avatars/285/abott@adorable.png', 'Youtuber', 'Joel@doe.com', 'Joel', 'Doe', '123456','CURATOR','TRUE'),
       ('321','850724ba-1ef3-4db1-a497-a6293cefa5b5','2020-10-12','https://api.adorable.io/avatars/285/abott@adorable.png', 'Model', 'Joy@doe.com', 'Joy', 'Doe', '123456','CURATOR','TRUE'),
       ('187','513c6096-0199-43f6-9aa7-ac97782e4e5e','2020-10-12','https://api.adorable.io/avatars/285/abott@adorable.png', 'E-sport', 'Jesper@doe.com', 'Jesper', 'Doe', '123456','CURATOR','TRUE'),
       ('111','513c6096-0199-43f6-9aa7-ac97782e4e5e','2020-10-12','https://api.adorable.io/avatars/285/abott@adorable.png', 'extreme sport', 'Jenna@doe.com', 'Jenna', 'Doe', '123456','CURATOR','TRUE');


INSERT INTO Application (id, created_date, guid, last_modified_date, android_link, ios_link, title, logo)
VALUES ('100','2020-10-12','27cce737-4a7a-4544-8f8b-9a02b680290a','2020-10-12','https://play.google.com/store/apps/details?id=com.sl.SLBiljetter&hl=sv', 'empty-for-now', 'SL', 'https://is5-ssl.mzstatic.com/image/thumb/Purple114/v4/30/00/03/3000030b-6b4c-8e24-1ba9-1a541ae31b1c/AppIcon-NewUI-0-0-1x_U007emarketing-0-0-0-5-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/350x350.png'),
       ('55','2020-10-12','280e6220-9efb-4226-9670-652187347609','2020-10-12','https://play.google.com/store/apps/details?id=com.nobina.resistockholm.resistockholm', 'empty-for-now', 'Res i Stockholm', 'https://lh3.googleusercontent.com/8bEW-rvEPMrJqTAOPYlaI0GdZQSYXFe9DrU_S_N2mdJzeX6TG02elgZ4MF_Gh7CGFvQ=s180-rw'),
       ('89','2020-10-12','abc1c2a3-b027-4d03-8110-1a4ac2471931', '2020-10-12','https://play.google.com/store/apps/details?id=se.mobilestorytelling.higab&hl=en', 'empty-for-now', 'mobile storytelling', 'ttps://lh3.googleusercontent.com/WoBeYKgQ1CzlGPhNCM593u-ADxVk83y_3RNEOFhzIgGlzEBp8SPvrJ3yvuWdzrLC3dk=s180-rw'),
       ('23','2020-10-12','865b6103-7b08-4525-8411-6c225af1d743','2020-10-12','https://play.google.com/store/apps/details?id=appinventor.ai_viktor_ohlsson.Radiomuseet', 'empty-for-now', 'Radiomuseet', 'https://lh3.googleusercontent.com/jiVkiuhFHRTNKMi-KfWPvyAq_Re7vSpqwoYJ_PbLQZjIWcdb4_KxuNwJX9HcUX_EXEY=s128-rw');


INSERT INTO Tag (id,created_date,guid,last_modified_date, title)
VALUES ('1','2020-10-12','fa1b49eb-39c4-47fd-9733-4ea76244c718','2020-10-12','Stockholm'),
       ('2','2020-10-12','de616051-acf4-4b7d-9e30-eb0a56a75cec','2020-10-12','Food'),
       ('8','2020-10-12','7fee025f-0afe-403a-8a97-8a43172b7ac0','2020-10-12','Culture'),
       ('9','2020-10-12','d3c95b13-bceb-46f3-9f8b-20a1a6c86c63','2020-10-12','Göteborg'),
       ('10','2020-10-12','983c58da-1284-47f2-a557-360b8bcbd05c','2020-10-12','Travel');




INSERT INTO Package (id,created_date ,guid,last_modified_date ,title,curator_id ,city,description)
VALUES ('234','2020-10-12','da6ff7ab-3fa2-4b7d-ad8f-2a7d41b1d677','2020-10-12','Travelling around Stockholm','300','Stockholm'
        ,'I det här paketet hittar du nödvändiga appar för att åka runt i Stockholm'),
       ('544','2020-10-12','da6ff7ab-3fa2-4b7d-ad8f-2a7d41b1d677','2020-10-12','Travelling around Stockholm','300','Stockholm'
        ,'I det här paketet hittar du nödvändiga appar för att åka runt i Stockholm'),
         ('567','2020-10-12','75170fbd-0078-49c8-81e2-b00323156653','2020-10-12','Göteborg culture','187','Göteborg'
        ,'Om du vill få ut det bästa av Göteborgs kulturutbud, så är dessa appar något för dig!');


INSERT INTO package_application(package_id,application_id)
VALUES  (234,100),
        (544,100),
        (544,55),
        (567,89),
        (567,23);


INSERT INTO package_tag (tag_id, package_id)
VALUES  (1,234),
        (1,544),
        (10,544),
        (9,567),
        (8,567);



