package me.val;

import com.codahale.metrics.health.HealthCheck;

public class DummyHealthcheck extends HealthCheck {
    @Override
    protected Result check() {
        return Result.healthy("Dummy");
    }
}