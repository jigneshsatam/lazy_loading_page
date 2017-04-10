require "lazy_load/rails"
module LazyLoadingPage
  class Engine < ::Rails::Engine
    isolate_namespace LazyLoadingPage

    initializer 'lazy_load-rails.action_controller' do |app|
      ActiveSupport.on_load :action_controller do
        helper LazyLoad::Rails::ApplicationHelper
      end
    end
  end
end
