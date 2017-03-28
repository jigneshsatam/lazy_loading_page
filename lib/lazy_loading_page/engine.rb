module LazyLoadingPage
  class Engine < ::Rails::Engine
    isolate_namespace LazyLoadingPage

    initializer 'lazy_loading_page.action_controller' do |app|
      ActiveSupport.on_load :action_controller do
        helper LazyLoadingPage::ApplicationHelper
      end
    end
  end
end
