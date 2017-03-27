$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "lazy_loading_page/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "lazy_loading_page"
  s.version     = LazyLoadingPage::VERSION
  s.authors     = ["Jignesh Satam"]
  s.email       = ["jigneshsatam@gmail.com"]
  s.homepage    = "TODO"
  s.summary     = "TODO: Summary of LazyLoadingPage."
  s.description = "TODO: Description of LazyLoadingPage."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails"

  s.add_development_dependency "sqlite3"
end
