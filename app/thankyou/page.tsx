"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Suspense, useRef, useState } from "react"
import html2canvas from "html2canvas-pro"
import jsPDF from "jspdf"

function ThankYouContent() {
  const searchParams = useSearchParams()
  const certificateRef = useRef<HTMLDivElement>(null)
  const [copySuccess, setCopySuccess] = useState(false)
  
  // Get data from URL parameters
  const donorName = searchParams.get('name') || "Anonymous Donor"
  const donationAmount = searchParams.get('amount') ? `₹${searchParams.get('amount')}` : "₹1000"
  const donorEmail = searchParams.get('email') || "donor@example.com"
  const donorContact = searchParams.get('contact') || ""
  const transactionId = searchParams.get('transactionId') || "REF-123456789"
  const wantsCertificate = searchParams.get('wantsCertificate') === 'true'
  
  const collectedAmount = 25
  const targetAmount = 100

  const copyDonationLink = async () => {
    try {
      await navigator.clipboard.writeText("https://Donatesukruthakeralam.vercel.app")
      setCopySuccess(true)
      // Hide success message after 3 seconds
      setTimeout(() => setCopySuccess(false), 3000)
    } catch (error) {
      console.error('Failed to copy link:', error)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = "https://Donatesukruthakeralam.vercel.app"
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 3000)
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError)
      }
      document.body.removeChild(textArea)
    }
  }

  const downloadCertificate = async () => {
    if (certificateRef.current) {
      try {
        // Create canvas from the certificate section using html2canvas-pro
        const canvas = await html2canvas(certificateRef.current, {
          useCORS: true,
          allowTaint: false,
          backgroundColor: '#ffffff',
          scale: 2, // Higher resolution for better quality
          logging: false,
          ignoreElements: (element) => {
            // Ignore elements that might cause issues
            return element.tagName === 'SCRIPT' || element.tagName === 'STYLE'
          }
        })

        // Create PDF
        const imgData = canvas.toDataURL('image/png', 1.0)
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        })

        // Calculate dimensions to fit the page
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const imgWidth = canvas.width
        const imgHeight = canvas.height
        
        // Scale to fit within page margins
        const maxWidth = pdfWidth - 20 // 10mm margin on each side
        const maxHeight = pdfHeight - 20 // 10mm margin top and bottom
        
        const ratio = Math.min(maxWidth / (imgWidth * 0.75), maxHeight / (imgHeight * 0.75))
        const scaledWidth = (imgWidth * 0.75) * ratio
        const scaledHeight = (imgHeight * 0.75) * ratio
        
        const imgX = (pdfWidth - scaledWidth) / 2
        const imgY = 10

        pdf.addImage(imgData, 'PNG', imgX, imgY, scaledWidth, scaledHeight)
        
        // Download the PDF
        pdf.save(`Sukrutha_Kerala_Certificate_${transactionId}.pdf`)
      } catch (error) {
        console.error('Error generating certificate:', error)
        alert('Error generating certificate. Please try again.')
      }
    }
  }

    return (
        <div className=" bg-gray-50 ">
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6 overflow-scroll ">
                {/* certificate section */}
                <div className="bg-white rounded-3xl shadow-lg p-12 max-w-7xl w-full mx-auto border border-gray-200 overflow-y-scroll">
                    <div ref={certificateRef} className="p-8">
                        <div className="flex justify-center mb-1">
                            <Image
                                src="/images/Diversity Team Illustration.avif"
                                alt="Community celebration"
                                width={300}
                                height={200}
                                className="rounded-lg"
                            />
                        </div>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                                Because of you, we are one step closer to
                                <br />
                                our goal of transforming Kerala. Thank you
                                <br />
                                for being a hero to our communities.
                            </h2>
                            <p className="text-gray-600 text-sm">
                                Thank you, {donorName}! Your generosity is
                                <br />
                                creating a ripple effect of positive change in Kerala.
                            </p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600 font-medium">Donor Name:</span>
                                <span className="text-gray-900 font-semibold">{donorName}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600 font-medium">Payment Method:</span>
                                <span className="text-gray-900 font-semibold">{donationAmount}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600 font-medium">Transaction ID:</span>
                                <span className="text-gray-900 font-semibold">{transactionId}</span>
                            </div>
                        </div>
                    </div>
                    {/* certificate end */}

                    <div className="mb-8">
                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-gray-900 font-semibold mb-4">Donation Progress So Far</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-teal-600 font-medium">{collectedAmount} Cr Collected</span>
                                    <span className="text-gray-600">Target: {targetAmount}Cr</span>
                                </div>
                                <Progress value={(collectedAmount / targetAmount) * 100} className="h-2" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mb-8">
                        <Button 
                            onClick={copyDonationLink}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium"
                        >
                            Ask Others To Donate
                        </Button>
                        {wantsCertificate && (
                            <Button onClick={downloadCertificate} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium">
                                Download Certificate
                            </Button>
                        )}
                    </div>

                    {/* Copy Success Message */}
                    {copySuccess && (
                        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
                            <div className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">
                                    Donation link copied successfully! Share with others to spread the impact.
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="text-center text-sm text-gray-600 space-y-2">
                        <p>
                            An instant success email has been shared with you at {donorEmail} with
                            <br />
                            the reference number {transactionId}
                        </p>
                        {wantsCertificate && (
                            <p>
                                80(G) Certificate: Your request for an 80(G) certificate has been received. You will
                                <br />
                                be contacted shortly for the necessary details.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function ThankYouPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ThankYouContent />
        </Suspense>
    )
}
