USE TOUR_MANAGEMENT;
GO 
CREATE OR ALTER PROCEDURE getUser (@EMAIL VARCHAR(255))
AS
BEGIN
    SELECT * FROM Users WHERE EMAIL = @EMAIL;
END;