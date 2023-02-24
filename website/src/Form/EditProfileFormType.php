<?php

namespace App\Form;

use App\Entity\UserEditDto;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class EditProfileFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('username', null, [
                "attr"=> ["class"=>"form__input form-control"],
                'label_attr'=> ['class'=> 'form__label']
            ])
            ->add('description', TextareaType::class, [
                "attr"=> ["class"=>"form__input form-control"],
                'label_attr'=> ['class'=> 'form__label']
            ])
            ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => UserEditDto::class,
        ]);
    }
}
