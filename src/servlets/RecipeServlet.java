package servlets;

import database.DBConnection;

import javax.servlet.http.*;
import java.io.*;
import java.sql.*;

public class RecipeServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
        Connection conn = null;
        try {
            resp.setContentType("application/json");
            PrintWriter out = resp.getWriter();

            String title = req.getParameter("title");
            String category = req.getParameter("category");
            String ingredients = req.getParameter("ingredients");
            String instructions = req.getParameter("instructions");
            String image = req.getParameter("image");
            String user_id = req.getParameter("user_id");


            if (title == null || category == null || ingredients == null || instructions == null) {
                out.print("{\"success\":false,\"message\":\"Missing required fields.\"}");
                return;
            }

            conn = DBConnection.getConnection();

            // Insert recipe into database
            PreparedStatement stmt = conn.prepareStatement(
                "INSERT INTO recipes (title, category, ingredients, instructions, image,user_id) VALUES (?, ?, ?, ?, ?,?)"
            );
            stmt.setString(1, title);
            stmt.setString(2, category);
            stmt.setString(3, ingredients);
            stmt.setString(4, instructions);
            stmt.setString(5, image);
            stmt.setString(6, user_id);

            stmt.executeUpdate();

            out.print("{\"success\":true,\"message\":\"Recipe submitted successfully!\"}");
            stmt.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(500);
            try {
                resp.getWriter().print("{\"success\":false,\"message\":\"" + e.getMessage() + "\"}");
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
        } finally {
            try {
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
