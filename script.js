
// const wrapper = document.querySelector('.scroll-pin-wrapper');
// const track = document.querySelector('.destination-scroll');

// function setPinHeight() {
//     const trackWidth = track.scrollWidth;
//     const viewportWidth = window.innerWidth;
//     const travelDistance = trackWidth - viewportWidth + (viewportWidth * 0.16);
//     wrapper.style.height = `${window.innerHeight + travelDistance}px`;
//     return travelDistance;
// }

// let travelDistance = setPinHeight();

// function updateScroll() {
//     const rect = wrapper.getBoundingClientRect();
//     const total = wrapper.offsetHeight - window.innerHeight;
//     const scrolled = -rect.top;
//     let progress = scrolled / total;
//     progress = Math.max(0, Math.min(1, progress));

//     track.style.transform = `translateX(-${progress * travelDistance}px)`;
// }

// window.addEventListener('scroll', updateScroll);
// window.addEventListener('resize', () => {
//     travelDistance = setPinHeight();
//     updateScroll();
// });

// updateScroll();
const enquireLink = document.getElementById('enquireLink');
const enquiryPanel = document.getElementById('enquiryPanel');
const enquiryOverlay = document.getElementById('enquiryOverlay');
const enquiryClose = document.getElementById('enquiryClose');

function openEnquiry(e) {
    e.preventDefault();
    enquiryPanel.classList.add('active');
    enquiryOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scroll
}

function closeEnquiry() {
    enquiryPanel.classList.remove('active');
    enquiryOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

enquireLink.addEventListener('click', openEnquiry);
enquiryClose.addEventListener('click', closeEnquiry);
enquiryOverlay.addEventListener('click', closeEnquiry);

const enquiryForm = document.getElementById('enquiryForm');

enquiryForm.addEventListener('submit', function (e) {
    e.preventDefault(); // stop the page from reloading/navigating away

    const formData = new FormData(enquiryForm);

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            enquiryForm.innerHTML = '<p style="color:var(--primary);font-weight:bold;">Thanks — we\'ll be in touch shortly.</p>';
        } else {
            alert('Something went wrong. Please try again or call us directly.');
        }
    })
    .catch(() => {
        alert('Something went wrong. Please try again or call us directly.');
    });
});