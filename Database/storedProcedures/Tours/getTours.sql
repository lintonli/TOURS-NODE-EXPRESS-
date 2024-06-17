USE TOUR_MANAGEMENT;
GO
CREATE OR ALTER PROCEDURE getProducts
@offset INT,
@Limit INT
AS
BEGIN
SELECT * FROM Tours WHERE isDeleted=0 ORDER BY Id OFFSET @offset ROWS
FETCH NEXT @Limit ROWS ONLY;
END