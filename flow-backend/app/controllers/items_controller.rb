class ItemsController < ApplicationController
    def index
        items = Item.all
        render json: items
    end

    def create
        item = Item.create(text: params[:text], done: params[:done], category_id: params[:category_id])
        p item
        render json: item
    end
end
