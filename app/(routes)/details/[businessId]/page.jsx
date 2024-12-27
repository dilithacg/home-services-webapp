"use client";

import GlobalApi from "@/app/_services/GlobalApi";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import BusinessInfo from "@/app/(routes)/details/[businessId]/_components/BusinessInfo";
import SuggestedBusinessList from "@/app/(routes)/details/[businessId]/_components/SuggestedBusinessList";
import BusinessDescription from "@/app/(routes)/details/[businessId]/_components/BusinessDescription";

function BusinessDetail({ params: initialParams }) {
  const { data, status } = useSession();
  const [business, setBusiness] = useState([]);
  const [params, setParams] = useState(null);

  // Handle params properly since it's now a Promise
  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await initialParams;
      setParams(resolvedParams);
    };
    unwrapParams();
  }, [initialParams]);

  useEffect(() => {
    if (params) {
      getBusinessById();
    }
  }, [params]);

  useEffect(() => {
    checkUserAuth();
  }, [status]);

  const getBusinessById = () => {
    GlobalApi.getBusinessById(params.businessId).then((resp) => {
      setBusiness(resp.businessList);
    });
  };

  const checkUserAuth = () => {
    if (status === "loading") {
      return <p>Loading...</p>;
    }
    if (status === "unauthenticated") {
      signIn("descope");
    }
  };

  return (
    status === "authenticated" &&
    business && (
      <div className="py-8 md:py-20 px-10 md:px-36">
        <BusinessInfo business={business} />
        <div className="grid grid-cols-3 mt-16">
          <div className="col-span-3 md:col-span-2 order-last md:order-first">
            <BusinessDescription business={business} />
          </div>
          <div>
            <SuggestedBusinessList business={business} />
          </div>
        </div>
      </div>
    )
  );
}

export default BusinessDetail;
