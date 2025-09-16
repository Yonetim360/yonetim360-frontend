"use client";

import CurrencyFormatter from "@/components/common/CurrencyFormatter";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CustomerStore } from "@/stores/crm/domains/CustomerStore";
import { OfferStore } from "@/stores/crm/domains/OfferStore";
import { RepresentativeStore } from "@/stores/crm/domains/RepresentativeStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import {
  FileText,
  User,
  Calendar,
  DollarSign,
  Tag,
  MessageSquare,
} from "lucide-react";
import InputError from "@/components/common/InputError";
import CalculatePrice from "@/utils/CalculatePrice";

const offerSchema = z.object({
  customerId: z.string().min(1, "Müşteri seçimi zorunludur"),
  representativeId: z.string().optional(),
  offerStatus: z.number().min(0).max(2, "Durum seçimi zorunludur"),
  serviceExplanation: z.string().min(1, "Ürün/hizmet bilgisi zorunludur"),
  currency: z.number().min(0).max(3, "Para birimi seçimi zorunludur"),
  amount: z.number().min(1, "Tutar bilgisi zorunludur"),
  validityDate: z.string().min(1, "Geçerlilik tarihi zorunludur"),
  discountType: z.number().optional(),
  discountValue: z.number().optional(),
  vatIncluded: z.boolean().optional(),
  note: z.string().optional(),
});

export default function AddOffer() {
  const { customers, fetchCustomers } = CustomerStore();
  const { addOffer, offersLoading } = OfferStore();
  const { representatives, fetchRepresentatives } = RepresentativeStore();

  useEffect(() => {
    if (customers.length === 0) {
      fetchCustomers();
    }
    if (representatives.length === 0) {
      fetchRepresentatives();
    }
  });

  const {
    watch,
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      customerId: "",
      representativeId: "",
      offerStatus: 0,
      serviceExplanation: "",
      currency: 0,
      amount: 0,
      validityDate: "",
      discountType: 0,
      discountValue: 0,
      vatIncluded: false,
      note: "",
    },
  });

  // İndirim kontrol state'i - form'dan bağımsız
  const [isDiscounted, setIsDiscounted] = useState(false);

  /* Total ücret hesapla*/
  const currency = watch("currency");
  const offer = watch("amount");
  const discountValue = watch("discountValue");
  const discountType = watch("discountType");
  const vatIncluded = watch("vatIncluded");
  const [total, setTotal] = useState(Number.parseFloat(offer) || 0);

  useEffect(() => {
    let calculatedTotal = CalculatePrice({
      offer,
      discountValue,
      discountType,
      vatIncluded,
      isDiscounted,
      currency,
    });

    setTotal(calculatedTotal);
  }, [offer, discountValue, discountType, vatIncluded, isDiscounted, currency]);

  const onSubmit = (data) => {
    const dataToSend = {
      ...data,
      title: "title asd1",
      vatIncluded: vatIncluded === true ? 1 : 0,
      documentUrl: "not nullable!",
    };
    addOffer(dataToSend);
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-green/10">
            <FileText className="h-8 w-8 text-primary-green" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Yeni Teklif Oluştur
          </h1>
          <p className="text-gray-600 text-lg">
            Müşteriniz için profesyonel bir teklif hazırlayın
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 space-y-8"
            noValidate
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <User className="h-5 w-5 text-primary-green" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Müşteri Bilgileri
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    Müşteri <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="customerId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="h-12 border-gray-200 focus:border-primary-green/75 focus:ring-primary-green/20">
                          <SelectValue placeholder="Müşteri seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {customers?.map((customer) => (
                            <SelectItem
                              key={customer.id}
                              value={customer.id.toString()}
                            >
                              {customer.companyName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.customerId && (
                    <p className="text-xs text-red-500">
                      {errors.customerId.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">
                    Durum <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    control={control}
                    name="offerStatus"
                    render={({ field }) => (
                      <Select
                        value={field.value?.toString()}
                        onValueChange={(val) => field.onChange(Number(val))}
                        name="offerStatus"
                      >
                        <SelectTrigger className="h-12 border-gray-200 focus:border-primary-green/75 focus:ring-primary-green/20">
                          <SelectValue placeholder="Teklif Durumu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                              Beklemede
                            </div>
                          </SelectItem>
                          <SelectItem value="1">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              Onaylandı
                            </div>
                          </SelectItem>
                          <SelectItem value="2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-500"></div>
                              Reddedildi
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.offerStatus && (
                    <InputError message={errors.offerStatus.message} />
                  )}
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">
                    Atanan Temsilci
                  </Label>
                  <Controller
                    control={control}
                    name="representativeId"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="h-12 border-gray-200 focus:border-primary-green/75 focus:ring-primary-green/20">
                          <SelectValue placeholder="Temsilci Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {representatives?.map((representative) => (
                            <SelectItem
                              key={representative.id}
                              value={representative.id.toString()}
                            >
                              {representative.firstName}{" "}
                              {representative.lastName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <Tag className="h-5 w-5 text-primary-green/85" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Ürün/Hizmet Detayları
                </h2>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                  Ürün/Hizmetler <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  {...register("serviceExplanation")}
                  placeholder="Örn: Web Sitesi Tasarımı + Mobil Uygulama Geliştirme"
                  rows={4}
                  className="resize-none border-gray-200 focus:border-primary-green/75 focus:ring-primary-green/20"
                />
                {errors.serviceExplanation && (
                  <InputError message={errors.serviceExplanation.message} />
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <DollarSign className="h-5 w-5 text-primary-green/85" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Finansal Bilgiler
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">
                    Tutar <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex rounded-lg border border-gray-200 focus-within:border-primary-green/65 focus-within:ring-1 focus-within:ring-primary-green/20">
                    <Controller
                      name="currency"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value?.toString()}
                          onValueChange={(val) => field.onChange(Number(val))}
                        >
                          <SelectTrigger className="w-20 border-0 border-r border-gray-200 rounded-r-none focus:ring-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">₺</SelectItem>
                            <SelectItem value="1">$</SelectItem>
                            <SelectItem value="2">€</SelectItem>
                            <SelectItem value="3">£</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.currency && (
                      <InputError message={errors.currency.message} />
                    )}
                    <Input
                      {...register("amount", { valueAsNumber: true })}
                      placeholder="125.000"
                      className="border-0 rounded-l-none flex-1 focus-visible:ring-0"
                      type="number"
                    />
                  </div>
                  {errors.amount && (
                    <InputError message={errors.amount.message} />
                  )}
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Geçerlilik Tarihi <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register("validityDate")}
                    type="date"
                    className="h-12 border-gray-200 focus:border-primary-green/75 focus:ring-primary-green/20"
                  />
                  {errors.validityDate && (
                    <InputError message={errors.validityDate.message} />
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">
                    İndirim Uygula
                  </Label>
                  <Checkbox
                    checked={isDiscounted}
                    onCheckedChange={setIsDiscounted}
                    className="data-[state=checked]:bg-primary-green/95 data-[state=checked]:border-primary-green/75"
                  />
                </div>

                {isDiscounted && (
                  <div className="flex items-center gap-4">
                    <Controller
                      name="discountType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value?.toString()}
                          onValueChange={(val) => field.onChange(Number(val))}
                        >
                          <SelectTrigger className="w-40 bg-white">
                            <SelectValue placeholder="İndirim Türü" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Yüzde (%)</SelectItem>
                            <SelectItem value="1">Sabit Tutar</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <Input
                      {...register("discountValue", { valueAsNumber: true })}
                      placeholder="10"
                      className="w-24 bg-white"
                      disabled={!isDiscounted}
                    />
                    {errors.discountValue && (
                      <InputError message={errors.discountValue.message} />
                    )}
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-br from-primary-green/5 to-primary-green/10 rounded-xl p-6 border border-primary-green/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary-green" />
                    <Label className="text-lg font-semibold text-gray-900">
                      Toplam Tutar
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Controller
                      name="vatIncluded"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="vatIncluded"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-primary-green/95 data-[state=checked]:border-primary-green/75"
                        />
                      )}
                    />
                    <Label
                      htmlFor="vatIncluded"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      KDV Dahil
                    </Label>
                  </div>
                </div>

                {/* Hesaplama detayları */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Ana Tutar:</span>
                    <span className="font-medium">
                      {CurrencyFormatter(offer || 0, currency)}
                    </span>
                  </div>

                  {isDiscounted && discountValue > 0 && (
                    <div className="flex justify-between items-center text-sm text-orange-600">
                      <span>
                        İndirim (
                        {discountType === 0
                          ? `%${discountValue}`
                          : CurrencyFormatter(discountValue, currency)}
                        ):
                      </span>
                      <span className="font-medium">
                        -
                        {CurrencyFormatter(
                          discountType === 0
                            ? (offer * discountValue) / 100
                            : discountValue,
                          currency
                        )}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-sm text-blue-600">
                    <span>KDV (%20):</span>
                    <span className="font-medium">
                      {!vatIncluded
                        ? `+${CurrencyFormatter((total / 1.2) * 0.2, currency)}`
                        : "KDV Fiyata Dahildir"}
                    </span>
                  </div>

                  <hr className="border-gray-200" />
                </div>

                {/* Toplam tutar gösterimi */}
                <div className="relative">
                  <div className="bg-white rounded-lg border-2 border-primary-green/30 shadow-sm overflow-hidden">
                    <div className="bg-primary-green/10 px-4 py-2 border-b border-primary-green/20">
                      <span className="text-xs font-medium text-primary-green/80 uppercase tracking-wide">
                        Toplam Tutar{" "}
                        {vatIncluded ? "(KDV Dahil)" : "(KDV Hariç)"}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          {CurrencyFormatter(total, currency)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {currency === 0 && "Türk Lirası"}
                          {currency === 1 && "Amerikan Doları"}
                          {currency === 2 && "Euro"}
                          {currency === 3 && "İngiliz Sterlini"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dekoratif element */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary-green/20 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary-green/60 rounded-full"></div>
                  </div>
                </div>

                {/* Ek bilgi */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    {isDiscounted &&
                      discountValue > 0 &&
                      "İndirim uygulandı • "}
                    {!vatIncluded
                      ? "KDV oranı %20 olarak hesaplanmıştır"
                      : "Tüm vergiler dahildir"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <MessageSquare className="h-5 w-5 text-primary-green/75" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Ek Notlar
                </h2>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                  Notlar
                </Label>
                <Textarea
                  {...register("note")}
                  placeholder="Teklif detayları, özel şartlar ve diğer önemli notlar..."
                  rows={4}
                  className="resize-none border-gray-200 focus:border-primary-green/65 focus:ring-primary-green/20"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-gray-100">
              <Button
                type="submit"
                className="px-8 py-3 bg-primary-green hover:bg-primary-green/85 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={offersLoading}
              >
                {offersLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Oluşturuluyor...
                  </div>
                ) : (
                  "Teklif Oluştur"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
