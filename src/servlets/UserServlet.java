package servlets;

import database.DBConnection;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;

public class UserServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
        Connection conn = null;
        try {
            resp.setContentType("application/json");
            PrintWriter out = resp.getWriter();

            String formType = req.getParameter("formType");
        // System.out.println(formType);
      


            if (formType == null) {
                out.print("{\"success\":false,\"message\":\"Missing form type\"}");
                return;
            }

            conn = DBConnection.getConnection();

            if (formType.equals("login")) {
                handleLogin(req, out, conn);
            } else if (formType.equals("signup")) {
                handleSignup(req, out, conn);
            }

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

    private void handleLogin(HttpServletRequest req, PrintWriter out, Connection conn) throws SQLException {
        String email = req.getParameter("loginEmail");
        String password = req.getParameter("loginPassword");
     
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE email = ? AND password = ?");
        stmt.setString(1, email);
        stmt.setString(2, password);
        ResultSet rs = stmt.executeQuery();
     
        if (rs.next()) {
            int userId = rs.getInt("id");
            String username = rs.getString("username");
            out.print("{\"success\":true,\"message\":\"Login successful\"," +
                     "\"redirect\":\"/homepage.html\"," +
                     "\"userId\":" + userId + "," +
                     "\"username\":\"" + username + "\"}");
        } else {
            out.print("{\"success\":false,\"message\":\"Invalid credentials\"}");
        }
        stmt.close();
     }

    private void handleSignup(HttpServletRequest req, PrintWriter out, Connection conn) throws SQLException {
        String email = req.getParameter("signupEmail");
        String password = req.getParameter("signupPassword");
        String username = req.getParameter("username");


        PreparedStatement stmt = conn.prepareStatement("INSERT INTO users (email, password,username) VALUES (?, ?, ?)");
        stmt.setString(1, email);
        stmt.setString(2, password);
        stmt.setString(3, username);
        stmt.executeUpdate();
        out.print("{\"success\":true,\"message\":\"Registration successful! Now Please Login to add the Recipe\",\"redirect\":\"/login.html\"}");
        stmt.close();
    }
}
