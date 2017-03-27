module LazyLoadingPage
  class Engine < ::Rails::Engine
    isolate_namespace LazyLoadingPage

    initializer 'lazy_loading_page.action_controller' do |app|
      ActiveSupport.on_load :action_controller do
        helper LazyLoadingPage::ApplicationHelper
      end
    end
    initializer "lazy_loading_page.precompile" do |app|
     app.config.assets.precompile += %w( lazy_loading_page/lazy_load.js )
   end
  end
end
