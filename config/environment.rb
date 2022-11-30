# Load the Rails application
require_relative 'application'

# Initialize the Rails application
Yotsuba::Application.initialize!

ActiveRecord::SchemaDumper.ignore_tables = ['deprecated_preview_cards']
