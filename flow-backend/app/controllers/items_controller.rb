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

    def update
        item = Item.find_by(id: params[:id])
        item.update(text: params[:text])
        render json: item
    end

    def destroy
        item = Item.find_by(id: params[:id])
        item.destroy
        render json: {DELETE: 'COMPLETE'}
    end
end
