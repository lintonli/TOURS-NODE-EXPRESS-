USE TOUR_MANAGEMENT;
GO
CREATE OR ALTER PROCEDURE addHotel(@ID VARCHAR(255), @NAME VARCHAR(255), @IMAGE VARCHAR(255),@LOCATION VARCHAR(255),@TOURID VARCHAR(255))
AS 
BEGIN
INSERT INTO Hotels(ID,Hotelname,Hotelimage,Hlocation,TourId)
VALUES(@ID,@NAME,@IMAGE,@LOCATION,@TOURID)
END;