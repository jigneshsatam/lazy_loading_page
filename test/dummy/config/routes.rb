Rails.application.routes.draw do

  mount LazyLoadingPage::Engine => "/lazy_loading_page"
end
