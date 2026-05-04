import { SelectProps } from "@radix-ui/react-select"
import { FormSelect } from "./simple"

export const FormSelectPaymentMethod = ({
  title,
  emptyValue,
  placeholder,
  hideIfEmpty = false,
  isRequired = false,
  ...props
}: {
  title: string
  emptyValue?: string
  placeholder?: string
  hideIfEmpty?: boolean
  isRequired?: boolean
} & SelectProps) => {
  const items = [
    { code: "UPI", name: "UPI", badge: "₹" },
    { code: "Cash", name: "Cash", badge: "C" },
    { code: "Card", name: "Card", badge: "CC" },
  ]

  return (
    <FormSelect
      title={title}
      items={items}
      emptyValue={emptyValue}
      placeholder={placeholder}
      hideIfEmpty={hideIfEmpty}
      isRequired={isRequired}
      {...props}
    />
  )
}
