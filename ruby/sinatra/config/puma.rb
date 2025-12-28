threads_count = ENV.fetch('PUMA_THREADS', 5)
threads threads_count, threads_count

port ENV.fetch('PORT', 4567)

environment ENV.fetch('RACK_ENV', 'production')

workers ENV.fetch('WEB_CONCURRENCY', 2)

preload_app!

on_worker_boot do
  # Worker-specific setup
end
