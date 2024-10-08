'use client'
import { admin } from '@/actions/admin'

import { FormSuccess } from '@/components/form-success'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RoleGate } from '@/features/auth/components/role-gate'
import { UserRole } from '@prisma/client'
import React from 'react'
import { toast } from 'sonner'

const AdminPage=()=> {
    const onServerActionClick=()=>{
        admin()
        .then((data)=>{
            if(data.error){
                toast.error(data.error)
            }
            if(data.success){
                toast.success(data.success)
            }

        })
    }
        const onApiRouteClick=()=>{

            fetch("/api/admin")
            .then((response)=>{
                if(response.ok){
                    toast.success("Allowed API Route!")
                }else{
                        toast.error("Forbidden API Route")
                }
            })
        }
    
  return (
    <Card className='w-[600px]'>
        <CardHeader>
            <p className="text-2xl font-semibold text-center">
                ADMIN
            </p>
        </CardHeader>
        <CardContent className='space-y-4'>
            <RoleGate allowedRole={UserRole.ADMIN}>
                <FormSuccess message='you are allowed to see this'/>
            </RoleGate>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Admin-only Api route
                    </p>
                    <Button onClick={onApiRouteClick}>
                        click to test
                    </Button>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Admin-only Server Action
                    </p>
                    <Button onClick={onServerActionClick}>
                        click to test
                    </Button>
            </div>
        </CardContent>
    </Card>
  )
}

export default AdminPage