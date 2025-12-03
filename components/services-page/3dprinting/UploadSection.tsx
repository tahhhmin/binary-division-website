import React from 'react'
import styles from './UploadSection.module.css'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FileUp } from "lucide-react"
import { ArrowUpRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Input } from '@/components/ui/input'

export default function UploadSection() {
    return (
        <section className={styles.section}>
            <div className={styles.upload}>
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                        <FileUp />
                        </EmptyMedia>
                        <EmptyTitle>No Uploads Yet</EmptyTitle>
                        <EmptyDescription>
                        You haven&apos;t uploaded a file yet.
                        </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                        <div className="flex gap-2">
                        <Button>Upload File</Button>
                        </div>
                    </EmptyContent>
                    </Empty>
            </div>

            <div className={styles.controls}>
                <div>
                    <label htmlFor="">Select Material</label>
                    <Select>
                        <SelectTrigger className={styles.selectTrigger}>
                            <SelectValue placeholder="Material" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="apple">PLA</SelectItem>
                                <SelectItem value="banana">PETG</SelectItem>
                                <SelectItem value="blueberry">ABS</SelectItem>
                                <SelectItem value="grapes">ASA</SelectItem>
                                <SelectItem value="pineapple">TPU</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    {/*color picker*/}
                </div>

                <div>
                    <label htmlFor="">Infill Density</label>
                    <Select>
                        <SelectTrigger className={styles.selectTrigger}>
                            <SelectValue placeholder="Percentage" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="apple">20%</SelectItem>
                                <SelectItem value="banana">30%</SelectItem>
                                <SelectItem value="blueberry">40%</SelectItem>
                                <SelectItem value="grapes">50%</SelectItem>
                                <SelectItem value="pineapple">60%</SelectItem>
                                <SelectItem value="pineapple">70%</SelectItem>
                                <SelectItem value="pineapple">80%</SelectItem>
                                <SelectItem value="pineapple">90%</SelectItem>
                                <SelectItem value="pineapple">100%</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label htmlFor="">Quantity</label>
                    <Input placeholder='#'/>
                </div>
            </div>
        </section>
    )
}