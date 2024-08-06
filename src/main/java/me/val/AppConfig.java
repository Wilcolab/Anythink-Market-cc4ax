package me.val;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.dropwizard.Configuration;
import io.dropwizard.db.DataSourceFactory;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

public class AppConfig extends Configuration {

    @Valid
    @NotNull
    @JsonProperty("dataSourceFactory")
    private DataSourceFactory dataSourceFactory;


    public AppConfig(@JsonProperty("dataSourceFactory") DataSourceFactory dataSourceFactory) {
        this.dataSourceFactory = dataSourceFactory;
    }

    public DataSourceFactory getDataSourceFactory() {
        return dataSourceFactory;
    }
}
