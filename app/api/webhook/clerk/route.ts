import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from "next/headers";

import { IncomingHttpHeaders } from "http";
import { NextResponse } from "next/server";

// Type app

type EventType =
    | "organization.created"
    | "organizationInvitation.created"
    | "organizationMembership.created"
    | "organizationMembership.deleted"
    | "organization.updated"
    | "organization.deleted";

// Define Event
type Event = {
    data: Record<string, string | number | Record<string, string>[]>;
    object: "event";
    type: Event;
};

// Handle eventRoute
export const POST = async (request: Request) => {
    
};
