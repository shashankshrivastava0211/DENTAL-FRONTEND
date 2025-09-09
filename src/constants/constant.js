export const ADDRESS =
	"107, Sai vision, Kunal Icon Road, Pimple Saudagar, Pune, Maharashtra 411027";

export const PHONE = "+91 844-632-2666";

export const EMAIL = "drpritesh86@gmail.com";
export const NAME = "Dr. Pritesh Jagtap";
export const CLINIC_NAME = "32 Pearl Dental Care";
export const clinicInfo = {
	name: "Dr. Martande Dental Clinic",
	address: "Shop 12, 24K Gliteratti Phase 1 Commercial Complex,",
	city: "Vishalnagar DP Road, Pimple Nilakh, Pune, Maharashtra 411027",
	phone: "  +91 844-632-2666",
	email: "drpritesh86@gmail.com",
	hours: " 9:00 AM - 6:00 PM",
};
export const testimonials = [
	{
		name: "Nakul Chandra",
		service: "Dental Implants",
		quote: `After my dental implants, I can smile, eat, and talk without any worries. A life-changing experience at ${CLINIC_NAME}!`,
		rating: 5,
		image:
			"https://images.pexels.com/photos/30026793/pexels-photo-30026793/free-photo-of-portrait-of-a-man-in-a-white-shirt.jpeg?auto=compress&cs=tinysrgb&w=600",
	},
	{
		name: "Priya Patel",
		service: "Cosmetic Dentistry",
		quote: `${CLINIC_NAME} completely transformed my smile. The team was professional and caring, and the results far exceeded my expectations!`,
		rating: 5,
		image:
			"https://images.pexels.com/photos/31430969/pexels-photo-31430969/free-photo-of-black-and-white-portrait-of-smiling-woman.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	},
	{
		name: "Kuldeep Patil",
		service: "Root Canal",
		quote: `I had a great experience at ${CLINIC_NAME}. The staff was friendly and professional, and Dr. ${NAME} made me feel completely at ease. The care was top-notch, and I’m very happy with the results. Highly recommend!`,
		rating: 5,
		image: "/images/kuldeep.jpg",
	},
];
export const generateUniqueId = (
	prefix = "INV", // e.g. "INV", "ORD", "USR"
	randomLength = 4, // number of random digits
	timeLength = 4 // how many digits from timestamp
) => {
	const timestamp = Date.now().toString().slice(-timeLength);
	const random = Math.floor(
		Math.pow(10, randomLength - 1) +
			Math.random() * (Math.pow(10, randomLength) - 1)
	);
	return `${prefix}-${timestamp}-${random}`;
};
