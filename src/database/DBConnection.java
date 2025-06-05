package database;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/RecipeDB";
    private static final String USER = "root";
    private static final String PASSWORD = "Yoomi@2003";

    public static Connection getConnection() throws Exception {
        return DriverManager.getConnection(DB_URL, USER, PASSWORD);
    }
}
