Rails.application.routes.draw do
  resources :links

  get '/api/top', to: 'links#top', as: 'top'
  
  get '/:short_url', to: 'links#re_direct', as: 're_direct'
end
