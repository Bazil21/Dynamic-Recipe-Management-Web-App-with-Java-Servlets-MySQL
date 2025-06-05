package servlets;

import database.DBConnection;

import javax.servlet.http.*;
import java.io.*;
import java.sql.*;
import org.json.JSONArray;
import org.json.JSONObject;

public class GetRecipebyCat extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        Connection conn = null;
        try {
            resp.setContentType("application/json");
            PrintWriter out = resp.getWriter();
            String category = req.getParameter("category");
            if (category == null) {
                category = "all"; 
            }
            conn = DBConnection.getConnection();
            JSONArray recipes = getRecipesByCategory(category, conn);
            out.print(recipes.toString());

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

    private JSONArray getRecipesByCategory(String category, Connection conn) throws SQLException {
        JSONArray recipes = new JSONArray();
        String sql = "SELECT * FROM recipes";
        if (!"all".equalsIgnoreCase(category)) {
            sql += " WHERE category = ?";
        }
        PreparedStatement stmt = conn.prepareStatement(sql);
        if (!"all".equalsIgnoreCase(category)) {
            stmt.setString(1, category);
        }
        ResultSet rs = stmt.executeQuery();
        while (rs.next()) {
            JSONObject recipe = new JSONObject();
            recipe.put("id", rs.getInt("id"));
            recipe.put("title", rs.getString("title"));
            recipe.put("category", rs.getString("category"));
            recipe.put("image", rs.getString("image"));
            recipe.put("ingredients", rs.getString("ingredients"));  
            recipe.put("instructions", rs.getString("instructions"));
            recipes.put(recipe);
        }

        stmt.close();
        return recipes;
    }
}
