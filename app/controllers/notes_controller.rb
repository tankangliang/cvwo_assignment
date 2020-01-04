class NotesController < ApplicationController
  def index
    notes = Note.order("created_at DESC")
    render json: notes
  end

  def create
    note = Note.create(note_param)
    render json: note
  end

  def update
    note = Note.find(params[:id])
    note.update_attributes(note_param)
    render json: note
  end

  def destroy
    note = Note.find(params[:id])
    note.destroy
    head :no_content, status: :ok
  end

  private
    def note_param
      params.require(:note).permit(:content, :done, :dateComplete, :tags => [])
    end
end
