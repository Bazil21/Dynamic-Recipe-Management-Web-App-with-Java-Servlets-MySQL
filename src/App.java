import servlets.UserServlet;
import servlets.RecipeServlet;
import servlets.RecipeFetchServlet;
import servlets.GetRecipebyCat;


import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

public class App {
    public static void main(String[] args) throws Exception {
        Server server = new Server(8080);
        ResourceHandler resourceHandler = new ResourceHandler();
        resourceHandler.setDirectoriesListed(true);
        resourceHandler.setResourceBase("web");  
        ServletContextHandler apiHandler = new ServletContextHandler(ServletContextHandler.SESSIONS);
        apiHandler.setContextPath("/api"); // Base path for API
        apiHandler.addServlet(new ServletHolder(new UserServlet()), "/user");
        apiHandler.addServlet(new ServletHolder(new RecipeServlet()), "/recipes");
        apiHandler.addServlet(new ServletHolder(new RecipeFetchServlet()), "/getrecipes");
        apiHandler.addServlet(new ServletHolder(new GetRecipebyCat()), "/recipes/category");
        HandlerList handlers = new HandlerList();
        handlers.addHandler(resourceHandler);
        handlers.addHandler(apiHandler);
        server.setHandler(handlers);
        server.start();
        System.out.println("Server running at http://localhost:8080");
        server.join();
    }
}
