ALTER TABLE Comments DROP FOREIGN KEY FKComments62468;
ALTER TABLE Posts DROP FOREIGN KEY FKPosts653961;
ALTER TABLE Comments DROP FOREIGN KEY FKComments918220;
ALTER TABLE Posts DROP FOREIGN KEY FKPosts943508;
ALTER TABLE Reactions DROP FOREIGN KEY FKReactions308889;
ALTER TABLE Users_Posts DROP FOREIGN KEY FKUsers_Post6551;
ALTER TABLE Users_Posts DROP FOREIGN KEY FKUsers_Post150798;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Posts;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Reactions;
DROP TABLE IF EXISTS Users_Posts;