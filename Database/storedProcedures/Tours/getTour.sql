USE TOUR_MANAGEMENT;
GO
CREATE OR ALTER PROCEDURE getTour(@ID VARCHAR(255))
AS
BEGIN
SELECT * FROM Tours WHERE Id=@ID
END