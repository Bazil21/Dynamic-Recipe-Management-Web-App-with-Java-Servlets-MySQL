package servlets;

import database.DBConnection;

import javax.servlet.http.*;
import java.io.*;
import java.sql.*;
import org.json.JSONArray;
import org.json.JSONObject;

public class RecipeFetchServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        Connection conn = null;
        try {
            resp.setContentType("application/json");
            PrintWriter out = resp.getWriter();

            conn = DBConnection.getConnection();

            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM recipes ORDER BY created_at DESC LIMIT 10");
            ResultSet rs = stmt.executeQuery();

            JSONArray recipes = new JSONArray();

            while (rs.next()) {
                JSONObject recipe = new JSONObject();
                recipe.put("id", rs.getInt("id"));
                recipe.put("title", rs.getString("title"));
                recipe.put("category", rs.getString("category"));
                recipe.put("ingredients", rs.getString("ingredients"));
                recipe.put("instructions", rs.getString("instructions"));
                recipe.put("image", rs.getString("image"));
                recipe.put("created_at", rs.getTimestamp("created_at").toString());

                recipes.put(recipe);
            }

            out.print(recipes.toString());
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
