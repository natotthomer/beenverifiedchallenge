Rails.application.routes.draw do
  resources :links
  
  get '/:short_url', to: 'links#re_direct', as: 're_direct'
end
