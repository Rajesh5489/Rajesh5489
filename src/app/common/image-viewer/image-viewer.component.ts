import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  constructor() { }

  galleryTitle = "Sample Image Viewer";
  imagesList!: any;
  slideIndex = 1;
  captionText!:string;

  ngOnInit(): void {

    this.imagesList = [
      {
        "thumbUrl": "https://stpsdevimages.blob.core.windows.net/uploads/IMG_0730.JPG",
        "fullUrl": "https://stpsdevimages.blob.core.windows.net/uploads/IMG_0730.JPG",
        "altText": "alternate text 1"
      },
      {
        "thumbUrl": "https://stpsdevimages.blob.core.windows.net/uploads/IMG_0730.JPG",
        "fullUrl": "https://stpsdevimages.blob.core.windows.net/uploads/IMG_0730.JPG",
        "altText": "alternate text 2"
      },
      {
        "thumbUrl": "https://stpsdevimages.blob.core.windows.net/uploads/IMG_0730.JPG",
        "fullUrl": "https://stpsdevimages.blob.core.windows.net/uploads/IMG_0730.JPG",
        "altText": "alternate text 3"
      }
    ]
  }

  public openModal(n:number) {
    //document.getElementById("myModal").style.display = "block";
    document.getElementById("myModal")?.setAttribute("style", "display:block");
    this.showSlides(this.slideIndex = n);
  }
  
  public closeModal() {
    //  document.getElementById("myModal").style.display = "none";
    document.getElementById("myModal")?.setAttribute("style", "display:none");
  }
  
  //showSlides(this.slideIndex);
  
  public plusSlides(n:number) {
    this.showSlides(this.slideIndex += n);
  }
  
  public currentSlide(n:number) {
    this.showSlides(this.slideIndex = n);
  }
  
  public showSlides(n:number) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    
    if (n > slides.length) 
    {
      this.slideIndex = 1
    }

    if (n < 1) {
      this.slideIndex = slides.length
    }

    for (i = 0; i < slides.length; i++) {
        slides[i]?.setAttribute("style", "display:none");
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[this.slideIndex-1]?.setAttribute("style", "display:block");
    dots[this.slideIndex-1].className += " active";
    //captionText.innerHTML = dots[slideIndex-1].alt;
  }

}
