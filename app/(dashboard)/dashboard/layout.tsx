import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <ButtonGroup>
                <Button variant="outline">Archive</Button>
                <Button variant="outline">Report</Button>
            </ButtonGroup>
            {children}
        </section>)
}