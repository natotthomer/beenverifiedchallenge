Rails.application.routes.draw do
  get '/:short_url', to: 'links#re_direct', as: 're_direct'
  
  resources :links
end
