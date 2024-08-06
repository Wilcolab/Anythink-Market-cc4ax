package me.val;

import io.dropwizard.Application;
import io.dropwizard.configuration.ConfigurationSourceProvider;
import io.dropwizard.configuration.EnvironmentVariableSubstitutor;
import io.dropwizard.configuration.SubstitutingSourceProvider;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.eclipse.jetty.servlets.CrossOriginFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import java.util.EnumSet;

/**
 * Hello world!
 *
 */
public class App extends Application<AppConfig>  {
    private static Logger logger = LoggerFactory.getLogger(App.class);

    public static void main( String[] args ) throws Exception {
        new App().run(args);
    }

    public void initialize(Bootstrap<AppConfig> bootstrap) {
        ConfigurationSourceProvider configurationSourceProvider = bootstrap.getConfigurationSourceProvider();
        bootstrap.setConfigurationSourceProvider(new SubstitutingSourceProvider(configurationSourceProvider,
                new EnvironmentVariableSubstitutor(true)));
    }

    @Override
    public void run(AppConfig appConfig, Environment environment) throws Exception {
        var dbInitializer = new DbInitializer(appConfig.getDataSourceFactory().getUrl());
        dbInitializer.initialize();
        logger.info("HELLO BEES!");
        environment.healthChecks().register("default", new DummyHealthcheck());

        configureCors(environment);
        environment.jersey().register(new TweetsResource(new DummyProvider()));
    }

    // stolen from https://gist.github.com/aweiland/3406db0ae70e043d67a3bc09dc195e81
    private void configureCors(Environment environment) {
        final FilterRegistration.Dynamic cors =
                environment.servlets().addFilter("CORS", CrossOriginFilter.class);

        // Configure CORS parameters
        cors.setInitParameter(CrossOriginFilter.ALLOWED_ORIGINS_PARAM, "*");
        cors.setInitParameter(CrossOriginFilter.ALLOWED_HEADERS_PARAM, "X-Requested-With,Content-Type,Accept,Origin,Authorization");
        cors.setInitParameter(CrossOriginFilter.ALLOWED_METHODS_PARAM, "OPTIONS,GET,PUT,POST,DELETE,HEAD");
        cors.setInitParameter(CrossOriginFilter.ALLOW_CREDENTIALS_PARAM, "true");

        // Add URL mapping
        cors.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "/*");

    }


}
