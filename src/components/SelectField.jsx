import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const SelectField = ({
	label,
	icon: Icon,
	value,
	onChange,
	options,
	placeholder,
	error,
	name,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);
	const buttonRef = useRef(null);
	const [dropdownPosition, setDropdownPosition] = useState("bottom");
	const [isMobile, setIsMobile] = useState(false);

	const handleOptionClick = (optionValue) => {
		onChange({
			target: { name: name || label.toLowerCase(), value: optionValue },
		});
		setIsOpen(false);
	};

	const findSelectedLabel = () => {
		const foundOption = options.find((opt) => {
			const optValue = typeof opt === "string" ? opt : opt.value;
			return String(optValue) === String(value);
		});

		return typeof foundOption === "string"
			? foundOption
			: foundOption?.label || placeholder;
	};

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.matchMedia("(max-width: 640px)").matches);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		if (isOpen && buttonRef.current) {
			const buttonRect = buttonRef.current.getBoundingClientRect();
			if (isMobile && label === "Time") {
				setDropdownPosition("top");
			} else {
				const spaceBelow = window.innerHeight - buttonRect.bottom;
				setDropdownPosition(spaceBelow > 200 ? "bottom" : "top");
			}
		}
	}, [isOpen, isMobile, label]);

	const selectedLabel = findSelectedLabel();

	return (
		<div className="relative" ref={dropdownRef}>
			<label className="block text-sm font-medium text-gray-700 mb-2">
				<span className="flex items-center">
					<Icon size={18} className="mr-2 text-indigo-600" />
					{label}
				</span>
			</label>

			<div className="relative">
				<button
					ref={buttonRef}
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className={`w-full px-4 py-3 text-left border rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white cursor-pointer hover:border-indigo-400 transition-colors flex items-center justify-between ${
						error ? "border-red-300" : "border-gray-300"
					}`}>
					<span className={!value ? "text-gray-500" : ""}>{selectedLabel}</span>
					<ChevronDown
						className={`w-5 h-5 text-indigo-600 ml-2 transform transition-transform duration-200 ${
							isOpen ? "rotate-180" : ""
						}`}
					/>
				</button>

				{isOpen && (
					<div
						className={`absolute z-20 w-full ${
							dropdownPosition === "bottom" ? "mt-1" : "mb-1 bottom-full"
						}`}>
						<div className="bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 border border-indigo-50 overflow-hidden">
							<div className="py-2 max-h-[50vh] overflow-y-auto">
								{options.map((option) => {
									const optionValue =
										typeof option === "string" ? option : option.value;
									const optionLabel =
										typeof option === "string"
											? option.charAt(0).toUpperCase() + option.slice(1)
											: option.label;
									const isDisabled = option.disabled;
									const isLunch = optionValue === "lunch";

									return (
										<div
											key={optionValue}
											onClick={() =>
												!isDisabled && handleOptionClick(optionValue)
											}
											className={`px-4 py-2 cursor-pointer transition-colors ${
												String(value) === String(optionValue)
													? "bg-indigo-100/80 text-indigo-900"
													: isLunch
													? "bg-gray-50 text-gray-500"
													: "hover:bg-indigo-50/80 text-gray-900"
											} ${isDisabled ? "cursor-not-allowed" : ""}`}
											onKeyDown={(e) => {
												if (e.key === "Enter" && !isDisabled)
													handleOptionClick(optionValue);
											}}
											role="button"
											tabIndex={0}>
											{optionLabel}
										</div>
									);
								})}
							</div>
						</div>
					</div>
				)}
			</div>
			{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
		</div>
	);
};

export default SelectField;
