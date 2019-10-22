USE MovieBase;
GO

CREATE TABLE Genre (
    id int IDENTITY(1,1) PRIMARY KEY,
    name varchar(255) NOT NULL,
    isActive BIT DEFAULT 1
);

GO